import { Component } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-area-paciente',
  templateUrl: './area-paciente.component.html',
  styleUrls: ['./area-paciente.component.css'],
})
export class AreaPacienteComponent {
  user_name: string;

  constructor(public info: InfoService) {
    this.user_name = this.info.nome_usuario;
  }

  click_icon(icon: string) {
    alert('Clicou em ' + icon);
  }
}
