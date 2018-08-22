export class EstadoDestacado{
    fechaBaja: Date;
    id: string;
    nombreEstadoDestacado:string;
    constructor(id,nombreEstadoDestacado,fechaBaja){
        this.id=id;
        this.nombreEstadoDestacado=nombreEstadoDestacado;
        this.fechaBaja=fechaBaja;
    }
}