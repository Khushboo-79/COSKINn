import { SetMetadata } from '@nestjs/common';

export const PANELS_KEY = 'panels';
export const Panels = (...panels: string[]) => SetMetadata(PANELS_KEY, panels);
