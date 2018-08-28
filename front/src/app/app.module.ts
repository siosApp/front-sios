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
import { MedioPagoComponent } from './components/configuracion/medio-pago/medio-pago.component';
import { EstadoDestacadoComponent } from './components/configuracion/estado-destacado/estado-destacado.component';
import { RubroComponent } from './components/configuracion/rubro/rubro.component';
import { UsuarioComponent } from './components/configuracion/usuario/usuario.component';
import { LoginComponent } from './components/seguridad/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EstadoRequerimientoComponent } from './components/configuracion/estado-requerimiento/estado-requerimiento.component';


@NgModule({
  declarations: [
    AppComponent,
    ProvinciaComponent,
    NavbarComponent,
    HomeComponent,
    EstadoSolicitudComponent,
    TipoUsuarioComponent,
    TipoRubroComponent,
    MedioPagoComponent,
    EstadoDestacadoComponent,
    RubroComponent,
    UsuarioComponent,
    LoginComponent,
    LayoutComponent
    RubroComponent,
    EstadoRequerimientoComponent
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
