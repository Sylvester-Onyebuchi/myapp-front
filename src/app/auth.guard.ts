import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  
  const router = inject(Router);
  const http = inject(HttpClient);
  return http.get<{ authenticated: boolean }>('https://node-app-tljn.onrender.com/api/check-auth', {
    withCredentials: true
  }).pipe(
    map(res => {
      if (res.authenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
 
};
