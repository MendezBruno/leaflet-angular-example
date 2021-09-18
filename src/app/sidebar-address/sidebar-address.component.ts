import { Component, OnInit } from '@angular/core';
import { Departamento, DepartamentoDTO } from '../models/gobar-departamento-model';
import { LocalidadDTO, Localidade } from '../models/gobar-model-localidad';
import { Municipio } from '../models/gobar-municipio-model';
import { Provincia, Provincias } from '../models/gobar-provincia-model';
import { AddressGobar } from '../services/address-gobar.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-sidebar-address',
  templateUrl: './sidebar-address.component.html',
  styleUrls: ['./sidebar-address.component.css']
})
export class SidebarAddressComponent implements OnInit {

  selectedProvincias: Provincia[] = [];
  filteredProvincias: Provincia[] = [];
  provincias: Provincia[] = [];


  selectedDepartamento: Departamento[] = [];
  filteredDepartamento: Departamento[] = [];
  departamentos: Departamento[] = [];

  selectedMunicipio: Municipio[] = [];
  filteredMunicipio: Municipio[] = [];
  municipios: Municipio[] = [];

  selectedLocalidad: Localidade[] = [];
  filteredLocalidad: Localidade[] = [];
  localidades: Localidade[] = [];

  constructor(private gobarService: AddressGobar, private sharedData: SharedDataService ) { }

  ngOnInit(): void {
    this.gobarService.getProvincias().toPromise().then( (res: Provincias) => this.provincias = res.provincias )
  }

  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : Provincia[] = [];
    let query = event.query;

    for(let i = 0; i < this.provincias.length; i++) {
        let provincia = this.provincias[i];
        if (provincia.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(provincia);
        }
    }

    this.filteredProvincias = filtered;
  }

  async filterLocalidades(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let query = event.query;
    if(query.length >= 3 && this.selectedProvincias.length > 0) {
      this.localidades = (await this.gobarService.getLocalidadByProvinciaAndNombre(query, this.selectedProvincias[0].nombre).toPromise()).localidades
    }
    let filtered : Localidade[] = [];

    for(let i = 0; i < this.localidades.length; i++) {
        let localidad = this.localidades[i];
        if (localidad.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(localidad);
        }
    }

    this.filteredLocalidad = filtered;
  }

  async filterDepartamento(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let query = event.query;
    if(query.length >= 3 && this.selectedProvincias.length > 0) {
      this.departamentos = (await this.gobarService.getDepartamentoWithProvinciaAndNombre(query ,this.selectedProvincias[0].nombre).toPromise()).departamentos
    }
    let filtered : Departamento[] = [];

    for(let i = 0; i < this.departamentos.length; i++) {
        let departamento = this.departamentos[i];
        if (departamento.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(departamento);
        }
    }

    this.filteredDepartamento = filtered;
  }

  async filterMunicipio(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let query = event.query;
    if(query.length >= 3 && this.selectedProvincias.length > 0) {
      this.municipios = (await this.gobarService.getMunicipioByProviciaAndNombre(query ,this.selectedProvincias[0].nombre).toPromise()).municipios
    }
    let filtered : Municipio[] = [];

    for(let i = 0; i < this.municipios.length; i++) {
        let municipio = this.municipios[i];
        if (municipio.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(municipio);
        }
    }

    this.filteredMunicipio = filtered;
  }

  updateProv() {
    console.log("provSelected: ", this.selectedProvincias[0])
    this.sharedData.changeProvincia(this.selectedProvincias[0])
  }

  updateDept() {
    this.sharedData.changeDepartamento(this.selectedDepartamento[0])
  }

  updateLoc() {
    this.sharedData.changeLocalidad(this.selectedLocalidad[0])
  }

  updateMuni() {
    this.sharedData.changeMunicipio(this.selectedMunicipio[0])
  }
}
