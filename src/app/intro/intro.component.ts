import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent {

  // variaveis de cadastro
  username = '';
  senha = '';

  constructor(private router: Router, private authService: AuthService) {}

  entrar() {
    // usuário clica 'entrar'
    // this.escolha = 'logar';
    if (this.username === '' || this.senha === '') {
      return alert('Preencha todos os campos!');
    }

    this.authService.login({
      login: this.username,
      senha: this.senha
    }).subscribe((data) => {
      this.authService.usuario = data
      this.router.navigate(['/', 'main']);

    }, err => {
      return alert("Usuário e/ou senha inválidos")
    })

  }

}
