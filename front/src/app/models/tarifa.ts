export class Tarifa{
    fechaBaja: Date;
    id: string;
    montoTarifa:number;
    constructor(id,monto,fechaBaja){
        this.id=id;
        this.montoTarifa=monto;
        this.fechaBaja=fechaBaja;
    }
}