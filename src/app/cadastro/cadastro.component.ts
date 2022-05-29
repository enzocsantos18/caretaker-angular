import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit {

  // variaveis para mudar de pagina
  tipo: any = null;
  // variaveis de cadastro
  username = '';
  email = '';
  senha = '';
  conf_senha = '';

  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  /* funções para mudar entre as páginas */
  resetar() {
    // usuário retorna para pagina inicial
    this.tipo = null;
  }

  tipo_usuario(tipo: string) {
    // usuário escolhe se 'paciente' ou 'cuidador'
    this.tipo = tipo;
  }

  /* funções após preencher cadastro */
  cadastrar() {
    if (this.senha !== this.conf_senha) {
      return alert('Confirme a senha!');
    }

    if (this.username === '' || this.senha === '' || this.email === '') {
      return alert('Preencha todos os campos!');
    }

    this.router.navigate(['/']);
  }

}
