import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import api from '../configs/api';
import { UsuarioRequest } from '../models/usuario'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {


  constructor(private router: Router, private http: HttpClient) { }

  // variaveis para mudar de pagina
  tipo: any = null;
  // variaveis de cadastro
  email = '';
  login = '';
  senha = '';
  conf_senha = '';
  nascimento = '';

  ngOnInit(): void {
  }
  /* funções para mudar entre as páginas */
  resetar() {
    // usuário retorna para pagina inicial
    this.resetarCampos();
    this.tipo = null;
  }

  resetarCampos() {
    // usuário retorna para pagina inicial
    this.email = ''
    this.login = '';
    this.senha = '';
    this.conf_senha = '';
    this.nascimento = '';
  }

  setTipoUsuario(tipo: string) {
    // usuário escolhe se 'paciente' ou 'cuidador'
    this.tipo = tipo;
  }

  /* funções após preencher cadastro */
  cadastrar() {

    if (this.login === '' || this.senha === '' || this.email === '' || this.nascimento === '') {
      return alert('Preencha todos os campos!');
    }

    if (this.login.length < 2) {
      return alert('Nome de usuário deve conter mais de 2 caracteres');
    }

    if (this.senha.length < 4) {
      return alert('Senha deve conter de 4 ou mais caracteres');
    }

    if (this.senha !== this.conf_senha) {
      return alert('Confirme a senha!');
    }

    let data: string[] = this.nascimento.split("-")
    let dataFinal = `${data[2]}/${data[1]}/${data[0]}`

    const usuario: UsuarioRequest = {
      login: this.login,
      email: this.email,
      senha: this.senha,
      nascimento: dataFinal,
      cuidador: this.tipo == 'cuidador'
    }

    this.http.post(api + 'usuarios', usuario)
      .subscribe((data) => {
        this.router.navigate(['/']);
      }, err => {
        this.resetarCampos()
        return alert('Erro ao cadastrar usuário, tente novamente!');
      })
  }

}
