import { Certificado } from './certificado';
import { Experiencia } from './experiencia';
import { Rubro } from './rubro';
export class UsuarioRubro {
    certificados:Certificado[];
    experiencias:Experiencia[];
    fechaAsignacion:Date;
    id:string;
    rubro:Rubro;
}