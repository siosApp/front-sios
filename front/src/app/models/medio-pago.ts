export class MedioPago{
    fechaBaja: Date;
    id: string;
    nombreMedioPago:string;
    constructor(id,nombreMedioPago,fechaBaja){
        this.id=id;
        this.nombreMedioPago=nombreMedioPago;
        this.fechaBaja=fechaBaja;
    }
}