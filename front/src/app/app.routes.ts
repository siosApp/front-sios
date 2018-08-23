import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EstadoSolicitudComponent } from './components/configuracion/estado-solicitud/estado-solicitud.component';
import { TipoUsuarioComponent } from './components/configuracion/tipo-usuario/tipo-usuario.component';
import { ProvinciaComponent } from './components/configuracion/provincia/provincia.component';
import { TipoRubroComponent } from './components/configuracion/tipo-rubro/tipo-rubro.component';
import { MedioPagoComponent } from './components/configuracion/medio-pago/medio-pago.component';
import { EstadoDestacadoComponent } from './components/configuracion/estado-destacado/estado-destacado.component';
import { RubroComponent } from './components/configuracion/rubro/rubro.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'estadoSolicitud', component: EstadoSolicitudComponent },
    { path: 'tipoUsuario', component: TipoUsuarioComponent },
    { path: 'tipoRubro', component: TipoRubroComponent },
    { path: 'provincia', component: ProvinciaComponent },
    { path: 'rubro', component: RubroComponent },
    { path: 'medioPago', component: MedioPagoComponent },
    { path: 'estadoDestacado', component: EstadoDestacadoComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(routes);
