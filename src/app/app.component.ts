import { Component, OnDestroy, OnInit } from "@angular/core";
import { latLng, Map, tileLayer, featureGroup } from "leaflet";
import * as L from "leaflet";
import { CreateAddressDTO, TypeLocation } from "./models/address.dto";
import { AddressService } from "./services/address.service";
import { CreateZoneDTO, TypeGeometry } from "./models/zones.dto";
import { ZoneService } from "./services/zone.service";
import { Country } from "./models/adress-select";
import { AddressGobar } from "./services/address-gobar.service";
import { DireccionDTO, Direccione } from "./models/gobar-direccion-model";
import { SharedDataService } from "./services/shared-data.service";
import { Subscription } from "rxjs";
import { Provincia } from "./models/gobar-provincia-model";
import { Localidade } from "./models/gobar-model-localidad";
import { Municipio } from "./models/gobar-municipio-model";
import { Departamento } from "./models/gobar-departamento-model";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
	map: Map;
	pullSubcription: Subscription[];
	prov: Provincia;
	localidad: Localidade;
	municipio: Municipio;
	departemento: Departamento;
	subsProv: Subscription;
	subsLoc: Subscription;
	subsMun: Subscription;
	subsDept: Subscription;
	logs = "HOLA"

	constructor( 
		private addressService: AddressService,
		private zoneService: ZoneService,
		private adressGobar: AddressGobar,
		private sharedData: SharedDataService) {}
	
	ngOnDestroy(): void {
		this.subsProv.unsubscribe();
		this.subsLoc.unsubscribe();
		this.subsMun.unsubscribe();
		this.subsDept.unsubscribe();
	}
	
	ngOnInit(): void {
		this.subsProv = this.sharedData.currentProvincia.subscribe(prov => this.prov = prov)
		this.subsLoc =this.sharedData.currentLocalidad.subscribe(loc => this.localidad = loc)
		this.subsMun =this.sharedData.currentMunicipio.subscribe(mun => this.municipio = mun)
		this.subsDept =this.sharedData.currentDepartamento.subscribe(dept => this.departemento = dept)
		// this.drawnItems.addLayer(L.marker([-36.676942, -60.558832])) 
	}
	drawnItems: L.FeatureGroup = featureGroup();

	
	
	options = {
		layers: [
			tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
		],
		zoom: 6,
		center: latLng(-36.676942, -60.558832),
		edit: {
			featureGroup: this.drawnItems
		}
	};

	drawOptions = {
		position: "topleft",
		draw: {
			marker: {
				icon: L.icon({
					iconSize: [25, 41],
					iconAnchor: [13, 41],
					iconUrl: "../../assets/marker-icon.png",
					shadowUrl: "../../assets/marker-shadow.png"
				})
			}
		}
	};

	onDrawCreated(e: any) {
		const { layerType, layer } = e;
		//const polygonCoordinates = layer._latlngs;
		if (layerType === "polygon") {
			console.log("soy un polygon");
			let zone = new CreateZoneDTO();
			let polygon = new TypeGeometry();
			zone.name = "zone" + Math.random().toString();
			polygon.type = "Polygon";
			let coordinates = layer._latlngs[0].map( (latlng) => [latlng.lat, latlng.lng] )
			coordinates.push([layer._latlngs[0][0].lat , layer._latlngs[0][0].lng ])
			polygon.coordinates = [coordinates];
			zone.location = polygon;
			this.zoneService.addZone(zone)
							.toPromise()
							.then( res => console.log(res) )
							.catch(e=>console.log(e))

		}
		if (layerType == "marker") {
			console.log("soy un marker");
			let addres = new CreateAddressDTO();
			let location = new TypeLocation();
			addres.name = "address" + Math.random().toString();
			location.type = "Point";
			location.coordinates = [ layer._latlng.lat, layer._latlng.lng  ];
			addres.location = location;
			this.addressService.addAddress(addres).toPromise().then( res => console.log(res) )
		}
		//console.log(polygonCoordinates);
		this.drawnItems.addLayer(e.layer);
	}

	addMarker(lat, lng) {
		this.drawnItems.addLayer(L.marker([lat, lng])) 
	}

	clearMap() {
		this.drawnItems.getLayers().forEach( (layer) => this.drawnItems.removeLayer(layer) );
	}


	// DIRECCIONES POC


	val: Direccione;

    results: Direccione[];
	
    search(event) {
        this.adressGobar.getAdressGobarWithText(event.query,this.departemento,this.prov,this.municipio,this.localidad).toPromise().then( (data: DireccionDTO) => {
			console.log(data);
			if (data.cantidad <= 10) {
				data.direcciones.forEach( (direc: Direccione) => { this.addMarker(direc.ubicacion.lat, direc.ubicacion.lon) })
			}
            this.results = data.direcciones;
			this.logs = JSON.stringify(data.direcciones)
        });
    } 

	togglePanel(op, event) {
		console.log(event);
		op.toggle(event);
	}
}

