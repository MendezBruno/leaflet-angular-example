import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Departamento } from '../models/gobar-departamento-model';
import { Localidade } from '../models/gobar-model-localidad';
import { Municipio } from '../models/gobar-municipio-model';
import { Provincia } from '../models/gobar-provincia-model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  
  //{id:'', centroide: {lat:0, lon:0 }, nombre:''}
  
  constructor() { }
  
  //Using any
  private provinciaSource = new BehaviorSubject<Provincia>(null);
  currentProvincia = this.provinciaSource.asObservable();
  changeProvincia(provincia: Provincia) {
    this.provinciaSource.next(provincia)
  }

  private localidadSource = new BehaviorSubject<Localidade>(null);
  currentLocalidad = this.localidadSource.asObservable();
  changeLocalidad(Localidad: Localidade) {
    this.localidadSource.next(Localidad)
  }

  private municipioSource = new BehaviorSubject<Municipio>(null);
  currentMunicipio = this.municipioSource.asObservable();
  changeMunicipio(municipio: Municipio) {
    this.municipioSource.next(municipio)
  }


  private departamentoSource = new BehaviorSubject<Departamento>(null);
  currentDepartamento = this.departamentoSource.asObservable();
  changeDepartamento(departamento: Departamento) {
    this.departamentoSource.next(departamento)
  }

  private logResult = new BehaviorSubject<string>('');
  currentLogResult = this.logResult.asObservable();
  changeLogResult(logRes: string) {
    this.logResult.next(logRes)
  }
}
