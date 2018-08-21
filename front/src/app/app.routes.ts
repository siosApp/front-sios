import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EstadoSolicitudComponent } from './components/configuracion/estado-solicitud/estado-solicitud.component';
import { TipoUsuarioComponent } from './components/configuracion/tipo-usuario/tipo-usuario.component';
import { ProvinciaComponent } from './components/configuracion/provincia/provincia.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'estadoSolicitud', component: EstadoSolicitudComponent },
    { path: 'tipoUsuario', component: TipoUsuarioComponent },
    { path: 'provincia', component: ProvinciaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(routes);
