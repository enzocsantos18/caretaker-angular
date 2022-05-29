import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent {

  // variaveis de cadastro
  username = '';
  senha = '';

  constructor(private router: Router) {}

  entrar() {
    // usuário clica 'entrar'
    // this.escolha = 'logar';
    if (this.username === '' || this.senha === '') {
      return alert('Preencha todos os campos!');
    }

    this.router.navigate(['/', 'main']);
  }


}
