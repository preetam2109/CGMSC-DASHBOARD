import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip injecting custom headers for external third-party services to prevent CORS preflight (OPTIONS) failures
    if (request.url.includes('ipify.org') || request.url.includes('ipapi.co') || request.url.includes('db-ip.com')) {
      return next.handle(request);
    }
    // Add Anti-Caching headers (CWE-525 Mitigation) to prevent sensitive response data from being cached
    const modifiedReq = request.clone({
      setHeaders: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    return next.handle(modifiedReq).pipe(
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
