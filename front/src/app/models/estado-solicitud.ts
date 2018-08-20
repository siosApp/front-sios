export class EstadoSolicitud{
    fechaBaja: Date;
    id: string;
    nombreEstadoSolicitud:string;
    constructor(id,nombreEstado,fechaBaja){
        this.id=id;
        this.nombreEstadoSolicitud=nombreEstado;
        this.fechaBaja=fechaBaja;
    }
}
