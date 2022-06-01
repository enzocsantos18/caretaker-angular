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

    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append("Authorization", "Bearer " + this.authService.usuario!.token);

    const httpOptions = {
      headers: httpHeaders
    };

    console.log(httpOptions)

    console.table(httpHeaders)
    const consulta: ConsultaRequest = {
      nome: this.nome,
      data: this.data,
      descricao: this.descricao,
      hora: this.hora,
      id_usuario: this.authService.usuario!.id
    }

    this.http.post(api + "consulta", consulta, httpOptions).subscribe((data) => {
      this.router.navigate(['/', 'main'])
      alert("Consulta agendada com sucesso")

    }, err => {
      this.limparCampos()
      return alert('Erro ao agendar consulta')
    })


  }

}
