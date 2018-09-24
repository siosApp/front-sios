import { Domicilio } from './domicilio';
import { Rubro } from './rubro';
export class UsuarioDestacado {
    idUsuario:string;
    nombre:string;
    apellido:string;
    domicilio:Domicilio;
    rubros:Rubro[];
}