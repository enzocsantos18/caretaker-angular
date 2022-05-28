import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-add-alarme',
  templateUrl: './add-alarme.component.html',
  styleUrls: ['./add-alarme.component.css']
})
export class AddAlarmeComponent implements OnInit {
  sucesso = false;
  medicamento: string ='';
  data: string ='';
  time: string ='';

  constructor(public info: InfoService) {}

  ngOnInit() {}

  adicionar() {
    if (this.data === '' || this.time === '' || this.medicamento === '') {
      return alert('Preencha todos os campos!');
    }
    alert("este alarme irá ser agendado")
  }

  
}
