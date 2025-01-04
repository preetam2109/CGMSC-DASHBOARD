import { CanActivateFn } from '@angular/router';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
