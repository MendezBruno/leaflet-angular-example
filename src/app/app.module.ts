import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';


import { AppComponent } from "./app.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { LeafletDrawModule } from "@asymmetrik/ngx-leaflet-draw";
import { FormsModule } from "@angular/forms";
import { SidebarAddressComponent } from './sidebar-address/sidebar-address.component';

@NgModule({
	declarations: [AppComponent, SidebarAddressComponent],
	imports: [ 
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		AutoCompleteModule,
		ButtonModule,
		SidebarModule,
		OverlayPanelModule,
		HttpClientModule,
		LeafletModule,
		LeafletDrawModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}


