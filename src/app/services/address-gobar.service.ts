import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DepartamentoDTO } from '../models/gobar-departamento-model';
import { DireccionDTO } from '../models/gobar-direccion-model';
import { LocalidadDTO } from '../models/gobar-model-localidad';
import { MunicipioDTO } from '../models/gobar-municipio-model';
import { Provincias } from '../models/gobar-provincia-model';

@Injectable({
  providedIn: 'root'
})
export class AddressGobar {


  urlBase = "https://apis.datos.gob.ar/georef/api/"

  constructor(private http: HttpClient) {  }

  getAdressGobarWithText(text: string, departamento: any | null, provincia: any | null, municipio: any | null, localidad: any | null): Observable<DireccionDTO> {
    let apiUrl = "direcciones?direccion=" + text;
    apiUrl = departamento ? apiUrl + "&departamento=" + departamento.nombre: apiUrl;
    apiUrl = provincia ? apiUrl + "&provincia=" + provincia.nombre: apiUrl;
    apiUrl = municipio ? apiUrl + "&municipio=" + municipio.nombre: apiUrl;
    apiUrl = localidad ? apiUrl + "&localidad=" + localidad.nombre: apiUrl;
    return this.http.get<any>(this.urlBase + apiUrl)
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }

  getProvincias(): Observable<Provincias> {
    return this.http.get<any>(this.urlBase+"provincias?orden=nombre")
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }

  //DEPARTAMENTO

  getDepartamentoWithProvinciaId(provId: string): Observable<DepartamentoDTO> {
    return this.http.get<any>(this.urlBase+"departamentos?provincia="+ provId +"&campos=completo")
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }

  getDepartamentoWithProvinciaAndNombre(nombre: string, prov: string): Observable<DepartamentoDTO> {
    return this.http.get<any>(this.urlBase+"departamentos?provincia="+ prov +"&nombre=" + nombre)
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }

  // MUNICIPIO

  getMunicipioByProviciaAndNombre(nombre: string, prov: string): Observable<MunicipioDTO> {
    return this.http.get<any>(this.urlBase+"municipios?provincia="+ prov + "&nombre="+nombre)
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }


  getMunicipioByName(nombre: string): Observable<MunicipioDTO> {
    return this.http.get<any>(this.urlBase+"municipios?nombre="+nombre+"&campos=completo")
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }


  /// LOCALIDAD

  getLocalidadByDepartamentoId(deptoId: string, max = "", inicio = ""): Observable<LocalidadDTO> {
    let apiUrl = "localidades?departamento="+deptoId;
    apiUrl = max != "" ? apiUrl + "&max=" + max: apiUrl;
    apiUrl = inicio != "" ? apiUrl + "&inicio=" + inicio: apiUrl;
    return this.http.get<any>(this.urlBase+ apiUrl)
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }

  getLocalidadByProvinciaAndNombre(nombre: string,provincia: string): Observable<LocalidadDTO> {
    let apiUrl = "localidades?"
    apiUrl = provincia =  apiUrl + "provincia=" + provincia;
    return this.http.get<any>(this.urlBase+ apiUrl+"&nombre="+nombre)
      .pipe(
        catchError((err) =>  { console.log(err); return this.handleError(err)})
      );
  }

  getLocalidadByProvincia(provincia: string): Observable<LocalidadDTO> {
    let apiUrl = "localidades?provincia="
    return this.http.get<any>(this.urlBase+ apiUrl + provincia)
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
