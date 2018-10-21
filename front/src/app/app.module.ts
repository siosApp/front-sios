import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';


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
import { RegistracionComponent } from './components/seguridad/registracion/registracion.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider,} from "angular-6-social-login";
import { EstadoRequerimientoComponent } from './components/configuracion/estado-requerimiento/estado-requerimiento.component';
import { DepartamentoComponent } from './components/configuracion/departamento/departamento.component';
import { LocalidadComponent } from './components/configuracion/localidad/localidad.component';
import { ForgotPasswordComponent } from './components/seguridad/forgot-password/forgot-password.component';
import { RequerimientoComponent } from './components/requerimiento/requerimiento.component';
import { RecoverPasswordComponent } from './components/seguridad/recover-password/recover-password.component';
import { TarifaComponent } from './components/configuracion/tarifa/tarifa.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AgregarRubroComponent } from './components/perfil/agregar-rubro/agregar-rubro.component';
import { VerRequerimientoComponent } from './components/ver-requerimiento/ver-requerimiento.component';
import { OfertarRequerimientoComponent } from './components/ver-requerimiento/ofertar-requerimiento/ofertar-requerimiento.component';
//Firebase 
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule,AngularFireStorage,AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { SolicitarTrabajoComponent } from './components/home/solicitar-trabajo.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { VerSolicitudComponent } from './components/ver-solicitud/ver-solicitud.component';
import { ImagenComponent } from './components/home/imagen/imagen.component';
import { TrabajosRealizadosComponent } from './components/reportes/trabajos-realizados/trabajos-realizados.component';
import { CalificacionesComponent } from './components/reportes/calificaciones/calificaciones.component';
import { RubrosMasDemandadosComponent } from './components/reportes/rubros-mas-demandados/rubros-mas-demandados.component';
import { RubrosMasOfrecidosComponent } from './components/reportes/rubros-mas-ofrecidos/rubros-mas-ofrecidos.component';
import { NombreUserComponent } from './components/ver-requerimiento/nombre-user.component';
import { UsuarioItemComponent } from './components/ver-solicitud/usuario-item/usuario-item.component';




// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
	      provider: new FacebookLoginProvider("2154755934762545")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
	      provider: new GoogleLoginProvider("607176928872-nbmtt2ke370cvfsl3t4ei6e6dr2eecjj.apps.googleusercontent.com")
        },
          {
            id: LinkedinLoginProvider.PROVIDER_ID,
            provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
          },
      ]
  );
  return config;
}

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
    EstadoRequerimientoComponent,
    UsuarioComponent,
    LoginComponent,
    LayoutComponent,
    RegistracionComponent,
    DepartamentoComponent,
    LocalidadComponent,
    ForgotPasswordComponent,
    RequerimientoComponent,
    RecoverPasswordComponent,
    TarifaComponent,
    PerfilComponent,
    AgregarRubroComponent,
    VerRequerimientoComponent,
    OfertarRequerimientoComponent,
    SolicitarTrabajoComponent,
    NoimagePipe,
    VerSolicitudComponent,
    ImagenComponent,
    TrabajosRealizadosComponent,
    CalificacionesComponent,
    RubrosMasDemandadosComponent,
    RubrosMasOfrecidosComponent,
    NombreUserComponent,
    UsuarioItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule,
    APP_ROUTING,
    SocialLoginModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ChartsModule,
    // To initialize AngularFire
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
