import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-area-paciente',
  templateUrl: './area-paciente.component.html',
  styleUrls: ['./area-paciente.component.css'],
})
export class AreaPacienteComponent {
  user_name: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    if(this.authService.usuario?.email) {
      this.user_name = this.authService.usuario?.username
    }
  }

  click_icon(icon: string) {
    alert('Clicou em ' + icon);
  }


  sair() {
    this.authService.sair();
    this.router.navigate(['/'])
  }
}
