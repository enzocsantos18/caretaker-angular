import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import api from '../configs/api';
import { ConsultaRequest } from '../models/consulta';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  adicionar() {
    if (this.data === '' || this.hora === '' || this.nome ==='') {
      return alert('Preencha todos os campos!');
    }

    const consulta : ConsultaRequest = {
      nome: this.nome,
      data: this.data,
      descricao: this.descricao,
      hora: this.hora,
      id_usuario: 1
    }
  
    this.http.post(api + "consulta", consulta).subscribe((data) => {
      return alert("Consulta agendada com sucesso")

    }, err => {
      console.log(err)
      return alert('Erro ao agendar consulta')
    })

    
  }

}
