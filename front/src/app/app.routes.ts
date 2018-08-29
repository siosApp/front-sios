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


const rutas_hijas: Routes =[
    { path: 'home', component: HomeComponent },
    { path: 'estadoSolicitud', component: EstadoSolicitudComponent },
    { path: 'tipoUsuario', component: TipoUsuarioComponent },
    { path: 'tipoRubro', component: TipoRubroComponent },
    { path: 'provincia', component: ProvinciaComponent },
    { path: 'rubro', component: RubroComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'medioPago', component: MedioPagoComponent },
    { path: 'estadoDestacado', component: EstadoDestacadoComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

const routes: Routes = [
    { path: 'sios', component: LayoutComponent, children: rutas_hijas },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'sios' },
];

export const APP_ROUTING = RouterModule.forRoot(routes);

