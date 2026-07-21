import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found or token invalid');
    }

    if (!user.isActive || user.isDeleted) {
      throw new UnauthorizedException('User account is deactivated');
    }

    // Flatten roles and permissions for easy access in guards
    const roles = user.roles.map(ur => ur.role.name);
    // Note: our permission model has 'action' and 'subject', not 'code'
    const permissions = user.roles.flatMap(ur => ur.role.permissions.map(rp => rp.permission.action + ':' + rp.permission.subject));

    return { 
      id: user.id, 
      email: user.email,
      phone: user.phone,
      roles,
      permissions,
      panel_access: Array.from(new Set(user.roles.flatMap(ur => ur.role.panelAccess || [])))
    };
  }
}
