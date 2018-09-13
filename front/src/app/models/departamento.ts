import { Provincia } from "./provincia";

export class Departamento{
    fechaBaja: Date;
    id: string;
    nombreDepartamento:string;
    provincia:Provincia;
    constructor(id,nombre,fechaBaja,provincia){
        this.id=id;
        this.nombreDepartamento=nombre;
        this.fechaBaja=fechaBaja;
        this.provincia=provincia;
    }
}
