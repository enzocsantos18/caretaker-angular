import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-add-consultas',
  templateUrl: './add-consultas.component.html',
  styleUrls: ['./add-consultas.component.css']
})
export class AddConsultasComponent implements OnInit {
  sucesso = false;
  nome: string ='';
  descricao: string = '';
  data: string ='';
  hora: string ='';
  tratamento: string='';

  constructor(public info: InfoService) {}

  ngOnInit() {}

  adicionar() {
    if (this.data === '' || this.hora === '' || this.nome ==='') {
      return alert('Preencha todos os campos!');
    }
    alert("este alarme irá ser agendado")
  }

}
