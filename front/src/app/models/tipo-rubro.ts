export class TipoRubro{
    fechaBaja: Date;
    id: string;
    nombreTipoRubro:string;
    constructor(id,nombre,fechaBaja){
        this.id=id;
        this.nombreTipoRubro=nombre;
        this.fechaBaja=fechaBaja;
    }
}
