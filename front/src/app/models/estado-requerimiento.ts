export class EstadoRequerimiento {
    fechaBaja: Date;
    id: string;
    nombreEstado:string;
    constructor(id,nombreEstado,fechaBaja){
        this.id=id;
        this.nombreEstado=nombreEstado;
        this.fechaBaja=fechaBaja;
    }
}
