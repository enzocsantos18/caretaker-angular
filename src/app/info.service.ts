import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Usuario {
  login: string;
  email: string;
  senha: string;
  nascimento: number;
  cuidador: boolean;
  recuperarSenha: string;
}

@Injectable()
export class InfoService {
  nome_usuario = '';
  lista_medicamentos: Array<any> = []
  data: any = null;
  site = 'https://caretaker-application.herokuapp.com/';

  constructor(private http: HttpClient) {}

  criar_usuario(
    login: string,
    email: string,
    senha: string,
    cuidador: boolean
  ) {
    //1. obter todas as informações iniciais do usuario
    //2. enviar para a view de novo usuario
    this.http
      .post<Usuario>(this.site + 'users', {
        login: login,
        email: email,
        senha: senha,
        cuidador: cuidador,
      })
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
      });
  }

  mudar_nome_usuario(username: string) {
    this.nome_usuario = username;
  }

  adicionar_medicamento(
    medicamento: string,
    dosagem: number,
    qt: number,
    freq_dias: string,
    freq_horas: string,
    tratamento: string
  ) {
    this.lista_medicamentos.push({
      medicamento,
      dosagem,
      qt,
      freq_dias,
      freq_horas,
      tratamento,
    });
  }

  get_lista_medicamentos() {
    return this.lista_medicamentos;
  }
}
