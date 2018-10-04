import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EstadoSolicitudComponent } from './components/configuracion/estado-solicitud/estado-solicitud.component';
import { TipoUsuarioComponent } from './components/configuracion/tipo-usuario/tipo-usuario.component';
import { ProvinciaComponent } from './components/configuracion/provincia/provincia.component';
import { TipoRubroComponent } from './components/configuracion/tipo-rubro/tipo-rubro.component';
import { MedioPagoComponent } from './components/configuracion/medio-pago/medio-pago.component';
import { EstadoDestacadoComponent } from './components/configuracion/estado-destacado/estado-destacado.component';
import { RubroComponent } from './components/configuracion/rubro/rubro.component';
import { UsuarioComponent } from './components/configuracion/usuario/usuario.component';
import { LoginComponent } from './components/seguridad/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RegistracionComponent } from './components/seguridad/registracion/registracion.component';
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
import { SolicitarTrabajoComponent } from './components/home/solicitar-trabajo.component';


const rutas_hijas: Routes =[
    { path: 'home', component: HomeComponent },
    { path: 'solicitarTrabajo/:id', component: SolicitarTrabajoComponent },
    { path: 'estadoSolicitud', component: EstadoSolicitudComponent },
    { path: 'tipoUsuario', component: TipoUsuarioComponent },
    { path: 'tipoRubro', component: TipoRubroComponent },
    { path: 'provincia', component: ProvinciaComponent },
    { path: 'rubro', component: RubroComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'medioPago', component: MedioPagoComponent },
    { path: 'estadoDestacado', component: EstadoDestacadoComponent },
    { path: 'estadoRequerimiento', component: EstadoRequerimientoComponent },
    { path: 'departamento', component: DepartamentoComponent },
    { path: 'localidad', component: LocalidadComponent },
    { path: 'publicarRequerimiento', component: RequerimientoComponent },
    { path: 'tarifa', component: TarifaComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'agregarRubro', component: AgregarRubroComponent },
    { path: 'verRequerimiento', component: VerRequerimientoComponent },
    { path: 'ofertarRequerimiento', component: OfertarRequerimientoComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

const routes: Routes = [
    { path: 'sios', component: LayoutComponent, children: rutas_hijas },
    { path: 'registracion', component: RegistracionComponent},
    { path: 'newPassword', component: RecoverPasswordComponent},
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'registracion/:user/:email', component: RegistracionComponent},
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'sios' },
];

export const APP_ROUTING = RouterModule.forRoot(routes);

