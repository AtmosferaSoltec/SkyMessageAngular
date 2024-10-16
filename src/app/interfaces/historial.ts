export default interface Historial {
  id?: number;
  correlativo: number;
  mensaje: string;
  created_at: Date;
  enviados: number;
  total: number;

  tipoEnvio?: string;
  urlArchivo?: string;

  estado?: string;
}
