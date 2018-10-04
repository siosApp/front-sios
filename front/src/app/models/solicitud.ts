import { Archivo } from './archivo';
export class Solicitud{
    id:string;
    fechaSolicitud:Date;
    descripcion:Date;
    nombreEstadoSolicitud:string;
    urlArchivos:string[];
    usuarioOferente:string;
    usuarioDemandante:string;

    constructor(id,fecha,descripcion,estado,archivos,oferente,demandante){
        this.id=id;
        this.fechaSolicitud=fecha;
        this.descripcion=descripcion;
        this.urlArchivos=archivos;
        this.nombreEstadoSolicitud=estado;
        this.usuarioDemandante=demandante;
        this.usuarioOferente=oferente;
    }
}
