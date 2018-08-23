import { TipoRubro } from './tipo-rubro';
export class Rubro{
    fechaBaja: Date;
    id: string;
    nombreRubro:string;
    tipoRubro:string;
    constructor(id,nombre,fechaBaja,tipoRubro){
        this.id=id;
        this.nombreRubro=nombre;
        this.fechaBaja=fechaBaja;
        this.tipoRubro=tipoRubro;
    }
}
