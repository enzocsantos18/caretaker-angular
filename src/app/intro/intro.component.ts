import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent {
  // variaveis para mudar de pagina
  escolha: any = null;
  usuario: any = null;
  // variaveis de cadastro
  username = '';
  email = '';
  senha = '';
  conf_senha = '';

  constructor(public info: InfoService, private router: Router) {}

  /* funções para mudar entre as páginas */
  cadastrar() {
    // usuário clica 'cadastrar'
    this.escolha = 'cadastro';
  }
  entrar() {
    // usuário clica 'entrar'
    // this.escolha = 'logar';

    if (this.username === '' || this.senha === '') {
      return alert('Preencha todos os campos!');
    }


    this.info.mudar_nome_usuario(this.username);
    this.router.navigate(['/', 'main']);

  }
  resetar() {
    // usuário retorna para pagina inicial
    this.escolha = null;
    this.usuario = null;
  }
  tipo_usuario(tipo: string) {
    // usuário escolhe se 'paciente' ou 'cuidador'
    this.usuario = tipo;
  }

  /* funções após preencher cadastro */

  verificar(tipo: string) {
    if (tipo === 'cuidador') {
      if (this.senha !== this.conf_senha) {
        return alert('Confirme a senha!');
      }

      if (this.username === '' || this.senha === '' || this.email === '') {
        return alert('Preencha todos os campos!');
      }

      this.info.mudar_nome_usuario(this.username);
      this.info.criar_usuario(this.username, this.email, this.senha, true);
      this.router.navigate(['/', 'main']);
    }
  }
}
