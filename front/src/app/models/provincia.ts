export class Provincia{
    fechaBaja: Date;
    id: string;
    nombreProvincia:string;
    constructor(id,nombreEstado,fechaBaja){
        this.id=id;
        this.nombreProvincia=nombreEstado;
        this.fechaBaja=fechaBaja;
    }
}
