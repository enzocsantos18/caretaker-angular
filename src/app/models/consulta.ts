export interface Consulta {
    nome: string;
    descricao: string;
    data: string;
    hora: string;
  }
  
  export interface ConsultaRequest extends Consulta {
    id_usuario: number;
  }
  