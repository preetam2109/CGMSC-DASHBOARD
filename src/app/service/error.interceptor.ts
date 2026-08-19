import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Sanitize error message to prevent sensitive stack traces or database details from being exposed to users
        let userFriendlyErrorMessage = 'An unexpected server error occurred. Please try again later.';
        
        if (error.status === 400) {
          userFriendlyErrorMessage = 'Invalid request parameters. Please verify your input.';
        } else if (error.status === 401 || error.status === 403) {
          userFriendlyErrorMessage = 'Unauthorized access. Please log in to continue.';
        } else if (error.status === 404) {
          userFriendlyErrorMessage = 'Requested resource was not found.';
        }

        // Log error securely on client console without exposing full trace
        console.error('API Request Failed:', error.status, error.statusText);

        return throwError(() => new Error(userFriendlyErrorMessage));
      })
    );
  }
}
