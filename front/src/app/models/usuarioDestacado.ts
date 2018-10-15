import { Domicilio } from './domicilio';
import { Rubro } from './rubro';
export class UsuarioDestacado {
    idUsuario:string;
    nombre:string;
    apellido:string;
    username:string;
    imagen:string;
    domicilio:Domicilio;
    rubros:Rubro[];
    experiencia:string;
}