import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import api from '../configs/api';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  adicionar() {
    if (this.data === '' || this.time === '' || this.medicamento === '') {
      return alert('Preencha todos os campos!');
    }
    alert("este alarme irá ser agendado")
  }

  getListaMedicamentos() {
    this.http.get(api + 'medicamentos')
    .subscribe((data) => {

    }, err => {

    }
    ); 
  
  }

  
}
