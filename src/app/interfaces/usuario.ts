export default interface Usuario {
    id: number;
    nombre: string;
    user: string;
    instance: string;
    token: string;
    activo: boolean;
    tipoUsuario: string;
}