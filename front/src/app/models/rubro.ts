import { TipoRubro } from './tipo-rubro';
export class Rubro{
    fechaBaja: Date;
    id: string;
    nombreRubro:string;
    nombreTipoRubro:string;
    constructor(id,nombre,fechaBaja,tipoRubro){
        this.id=id;
        this.nombreRubro=nombre;
        this.fechaBaja=fechaBaja;
        this.nombreTipoRubro=tipoRubro;
    }
}
    