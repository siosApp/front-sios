import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProvinciaComponent } from './components/configuracion/provincia/provincia.component';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EstadoSolicitudComponent } from './components/configuracion/estado-solicitud/estado-solicitud.component';
import { TipoUsuarioComponent } from './components/configuracion/tipo-usuario/tipo-usuario.component';
import { TipoRubroComponent } from './components/configuracion/tipo-rubro/tipo-rubro.component';

@NgModule({
  declarations: [
    AppComponent,
    ProvinciaComponent,
    NavbarComponent,
    HomeComponent,
    EstadoSolicitudComponent,
    TipoUsuarioComponent,
    TipoRubroComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
