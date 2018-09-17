export class Requerimiento{
    titulo: string;
    descripcion: string;
    tiempoEstimado: Int32Array;
    id: string;
    fechaPublicacion:Date;
    precioApagar:Float64Array;
    idUsuario:string;
    constructor(id,titulo,descripcion,fechaPublicacion,precioApagar,idUsuario,tiempoEstimado){
        this.id=id;
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.fechaPublicacion=fechaPublicacion;
        this.precioApagar=precioApagar;
        this.idUsuario=idUsuario;
        this.tiempoEstimado=tiempoEstimado;
        
    }
}