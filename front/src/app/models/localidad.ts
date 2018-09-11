import { Departamento } from './departamento';
export class Localidad{
    fechaBaja: Date;
    id: string;
    nombreLocalidad:string;
    departamento:Departamento;
    constructor(id,nombre,fechaBaja,departamento){
        this.id=id;
        this.nombreLocalidad=nombre;
        this.fechaBaja=fechaBaja;
        this.departamento=departamento;
    }
}
