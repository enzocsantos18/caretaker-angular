export interface MedicamentoRequest {
    nome: string;
    dosagem: string;
    obs_medicamento: string;
    ds_frequencia_horas: string;
    qt_frequencia_diaria: number;
    qt_medicamento: number;
    id_usuario: number;
    id: number;
}

export interface MedicamentoList {
    nome: string,
    id: number
}