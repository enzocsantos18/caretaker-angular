import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {
  data: any = null;
  constructor() {}

  selecionar_dia() {
    alert('Voce selecionou o dia 25 de Maio!');
    this.data = '25';
  }
}
