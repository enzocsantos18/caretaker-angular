export interface Consulta {
    nome: string;
    descricao: string;
    data: string;
    hora: string;
    id: number;
  }
  
  export interface ConsultaRequest extends Consulta {
    id_usuario: number;
  }
  