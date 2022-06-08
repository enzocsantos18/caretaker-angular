import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import api from '../configs/api';
import { ConsultaRequest } from '../models/consulta';

@Component({
  selector: 'app-add-consultas',
  templateUrl: './add-consultas.component.html',
  styleUrls: ['./add-consultas.component.css']
})
export class AddConsultasComponent implements OnInit {
  sucesso = false;
  nome: string = '';
  descricao: string = '';
  data: string = '';
  hora: string = '';
  tratamento: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  limparCampos() {
    this.nome = '';
    this.descricao = '';
    this.data = '';
    this.hora = '';
    this.tratamento = '';
  }

  adicionar() {
    if (this.data === '' || this.hora === '' || this.nome === '') {
      return alert('Preencha todos os campos!');
    }

    const consulta: ConsultaRequest = {
      nome: this.nome,
      data: this.data,
      descricao: this.descricao,
      hora: this.hora + ':00',
      id: 0,
      id_usuario: this.authService.usuario!.id
    }

    this.http.post(api + "consulta", consulta).subscribe((data) => {
      this.sucesso = true
    }, err => {
      this.limparCampos()
      return alert('Erro ao agendar consulta')
    })


  }

}
