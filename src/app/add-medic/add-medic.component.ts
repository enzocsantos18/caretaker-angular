import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-add-medic',
  templateUrl: './add-medic.component.html',
  styleUrls: ['./add-medic.component.css'],
})
export class AddMedicComponent implements OnInit {
  sucesso = false;
  medicamento: string ='';
  dosagem: number = 0;
  qt: number = 0;
  freq_dias: string ='';
  freq_horas: string ='';
  tratamento: string='';

  constructor(public info: InfoService) {}

  ngOnInit() {}

  adicionar() {
    this.info.adicionar_medicamento(
      this.medicamento,
      this.dosagem,
      this.qt,
      this.freq_dias,
      this.freq_horas,
      this.tratamento
    );
    this.sucesso = true;
  }
}
