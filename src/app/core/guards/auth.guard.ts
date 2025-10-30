import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

// If logged in, allow route activation
  if (auth.isLoggedIn()) {
    return true;
  }

  // If not logged in, redirect using UrlTree
  return router.createUrlTree(['/login']);
};
