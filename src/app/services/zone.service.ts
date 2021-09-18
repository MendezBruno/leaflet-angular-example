import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateZoneDTO } from '../models/zones.dto';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  backendZoneUrl = "http://localhost:3000/zone/";


  constructor(private http: HttpClient) { }

  addZone(Zone: CreateZoneDTO): Observable<CreateZoneDTO> {
    return this.http.post<CreateZoneDTO>(this.backendZoneUrl+ "create", Zone)
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
