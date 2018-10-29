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
import { VerSolicitudComponent } from './components/ver-solicitud/ver-solicitud.component';
import { CalificacionesComponent } from './components/reportes/calificaciones/calificaciones.component';
import { RubrosMasDemandadosComponent } from './components/reportes/rubros-mas-demandados/rubros-mas-demandados.component';
import { RubrosMasOfrecidosComponent } from './components/reportes/rubros-mas-ofrecidos/rubros-mas-ofrecidos.component';
import { TrabajosRealizadosComponent } from './components/reportes/trabajos-realizados/trabajos-realizados.component';
import { DestacarPerfilComponent } from './components/perfil/destacar-perfil/destacar-perfil.component';
import { MisSolicitudesComponent } from './components/ver-solicitud/mis-solicitudes/mis-solicitudes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosDestacadosComponent } from './components/dashboard/usuarios-destacados/usuarios-destacados.component';
import { UsuariosEnLineaComponent } from './components/dashboard/usuarios-en-linea/usuarios-en-linea.component';
import { UsuariosRegistradosComponent } from './components/dashboard/usuarios-registrados/usuarios-registrados.component';
import { UsuariosPorVencerComponent } from './components/dashboard/usuarios-por-vencer/usuarios-por-vencer.component';
import { PerfilOferenteComponent } from './components/dashboard/perfil-oferente/perfil-oferente.component';
import { AutenticacionService } from './services/autenticacion.service';
import { MisRequerimientosComponent } from './components/requerimiento/mis-requerimientos/mis-requerimientos.component';


const rutas_hijas: Routes =[
    { path: 'home', component: HomeComponent },
    { path: 'solicitarTrabajo/:id', component: SolicitarTrabajoComponent },
    { path: 'estadoSolicitud', component: EstadoSolicitudComponent, canActivate: [AutenticacionService] },
    { path: 'tipoUsuario', component: TipoUsuarioComponent },
    { path: 'tipoRubro', component: TipoRubroComponent, canActivate: [AutenticacionService]  },
    { path: 'provincia', component: ProvinciaComponent, canActivate: [AutenticacionService]  },
    { path: 'rubro', component: RubroComponent, canActivate: [AutenticacionService]  },
    { path: 'usuario', component: UsuarioComponent, canActivate: [AutenticacionService]  },
    { path: 'medioPago', component: MedioPagoComponent, canActivate: [AutenticacionService]  },
    { path: 'estadoDestacado', component: EstadoDestacadoComponent, canActivate: [AutenticacionService]  },
    { path: 'estadoRequerimiento', component: EstadoRequerimientoComponent, canActivate: [AutenticacionService]  },
    { path: 'departamento', component: DepartamentoComponent, canActivate: [AutenticacionService]  },
    { path: 'localidad', component: LocalidadComponent, canActivate: [AutenticacionService]  },
    { path: 'publicarRequerimiento', component: RequerimientoComponent },
    { path: 'tarifa', component: TarifaComponent, canActivate: [AutenticacionService]  },
    { path: 'perfil', component: PerfilComponent },
    { path: 'mis-solicitudes', component: MisSolicitudesComponent },
    { path: 'agregarRubro', component: AgregarRubroComponent },
    { path: 'verRequerimiento', component: VerRequerimientoComponent },
    { path: 'ofertarRequerimiento/:id', component: OfertarRequerimientoComponent },
    { path: 'verSolicitud', component: VerSolicitudComponent },
    { path: 'calificaciones', component: CalificacionesComponent },
    { path: 'rubros-mas-demandados', component: RubrosMasDemandadosComponent },
    { path: 'rubros-mas-ofrecidos', component: RubrosMasOfrecidosComponent },
    { path: 'trabajos-realizados', component: TrabajosRealizadosComponent },
    { path: 'destacar-perfil', component: DestacarPerfilComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AutenticacionService] },
    { path: 'usuarios-destacados', component: UsuariosDestacadosComponent },
    { path: 'usuarios-en-linea', component: UsuariosEnLineaComponent },
    { path: 'usuarios-registrados', component: UsuariosRegistradosComponent },
    { path: 'usuarios-por-vencer', component: UsuariosPorVencerComponent },
    { path: 'perfil-oferente', component: PerfilOferenteComponent },
    { path: 'mis-requerimientos', component: MisRequerimientosComponent },
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

