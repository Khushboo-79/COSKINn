import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PANELS_KEY } from '../decorators/panels.decorator';

@Injectable()
export class PanelsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPanels = this.reflector.getAllAndOverride<string[]>(PANELS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPanels || requiredPanels.length === 0) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    if (!user || !user.panelAccess) {
      return false;
    }

    // SUPER_ADMIN usually gets all panels, but we check if the user's panelAccess array contains the required panel
    // or if the user's role includes SUPER_ADMIN
    if (user.roles?.includes('SUPER_ADMIN') || user.roles?.includes('admin')) {
      return true;
    }

    return requiredPanels.some((panel) => user.panelAccess.includes(panel));
  }
}
