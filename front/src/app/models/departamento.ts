export class Departamento{
    fechaBaja: Date;
    id: string;
    nombreDepartamento:string;
    nombreProvincia:string;
    constructor(id,nombre,fechaBaja,nombreProvincia){
        this.id=id;
        this.nombreDepartamento=nombre;
        this.fechaBaja=fechaBaja;
        this.nombreProvincia=nombreProvincia;
    }
}
