export class TipoUsuario{
    fechaBaja: Date;
    id: string;
    nombreTipoUsuario:string;
    constructor(id,nombre,fechaBaja){
        this.id=id;
        this.nombreTipoUsuario=nombre;
        this.fechaBaja=fechaBaja;
    }
}
