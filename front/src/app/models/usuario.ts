import { UsuarioRubro } from "./usuario-rubro";
import { Domicilio } from './domicilio';

export class Usuario {
    id:string;
    fechaBaja:Date;
    fechaNacimiento:Date;
    fechaUltIngreso:Date;
    mail:string;
    nombre:string;
    oferente:boolean;
    password:string;
    tipoUsuario:string;
    sexo:string;
    usuarioRubros:UsuarioRubro[];
    username:string;
    apellido:string;
    domicilio:Domicilio;
    
    constructor(id:string,fechaBaja:Date,fechaNacimiento:Date,fechaUltIngreso:Date,mail:string,nombre:string,oferente:boolean,password:string,
        sexo:string,tipoUsuario:string,username:string,usuarioRubros:UsuarioRubro[],apellido:string,domicilio:Domicilio){
    this.apellido=apellido;
    this.fechaBaja=fechaBaja;
    this.id=id
    this.fechaNacimiento=fechaNacimiento;
    this.fechaUltIngreso=fechaUltIngreso;
    this.mail=mail;
    this.nombre=nombre;
    this.oferente=oferente
    this.password=password    
    this.sexo=sexo
    this.tipoUsuario=tipoUsuario
    this.usuarioRubros=usuarioRubros;
    this.username=username;
    this.apellido=apellido;
    this.domicilio=domicilio;
    }

}
