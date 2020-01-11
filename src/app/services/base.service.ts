import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

private static handleError(error: any, message: string): Observable<never> {
    console.log(error);
    return throwError(message);
}

catchError(error: any): Observable<never> {
    return BaseService.handleError(error, 'Error');
}

catchErrorDetailed(error: any, message: string): Observable<never> {
    return BaseService.handleError(error, message);
}
}
