export class Localidad{
    fechaBaja: Date;
    id: string;
    nombreLocalidad:string;
    nombreDepartamento:string;
    constructor(id,nombre,fechaBaja,nombreDepartamento){
        this.id=id;
        this.nombreLocalidad=nombre;
        this.fechaBaja=fechaBaja;
        this.nombreDepartamento=nombreDepartamento;
    }
}
