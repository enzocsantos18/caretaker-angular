import { MedicamentoRequest } from './medicamento';

export interface Lembrete {
  data: string;
  hora: string;
  medicamento: MedicamentoRequest;
}
