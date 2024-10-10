import Destinatario from "./destinatario";

export default interface Envio {
    id: number;
    correlativo: number;
    mensaje: string;
    created_at: Date;
    destinatarios: Destinatario[];
}