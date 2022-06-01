import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import api from '../configs/api';
import { MedicamentoRequest } from '../models/medicamento';

@Component({
  selector: 'app-add-medic',
  templateUrl: './add-medic.component.html',
  styleUrls: ['./add-medic.component.css'],
})
export class AddMedicComponent implements OnInit {
  sucesso = false;
  nome: string ='';
  dosagem: string = '';
  obs_medicamento: string = '';
  qt_medicamento: number = 0;
  qt_frequencia_diaria: number = 0;
  ds_frequencia_horas: string ='';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {}

  adicionar() {
    if(this.nome === '' ||
    this.dosagem === '' ||
    this.obs_medicamento === '' ||
    this.ds_frequencia_horas === '' ||
    this.qt_frequencia_diaria === 0 ||
    this.qt_medicamento === 0 ) {
     return alert('Preencha todos campos de forma correta')
    }

    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append("Authorization", "Bearer " + this.authService.usuario!.token);

    const httpOptions = {
      headers: httpHeaders
    };

    const medicamento: MedicamentoRequest = {
      nome: this.nome,
      dosagem: this.dosagem,
      obs_medicamento: this.obs_medicamento,
      ds_frequencia_horas: this.ds_frequencia_horas,
      qt_frequencia_diaria: this.qt_frequencia_diaria,
      qt_medicamento: this.qt_medicamento,
      id_usuario: this.authService.usuario!.id
    }
   
    this.http.post(api + "medicamento", medicamento, httpOptions).subscribe((data) => {
      this.sucesso = true;
    }, err => {
      return alert('Erro ao cadastrar medicamento')
    })

  }
}
