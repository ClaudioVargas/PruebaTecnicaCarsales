import { HttpInterceptorFn } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clonar la solicitud para añadir un header
  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer tu-token'
    }
  });
  return next(authReq);
};