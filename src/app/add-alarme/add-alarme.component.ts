import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import api from '../configs/api';
import { MedicamentoList } from '../models/medicamento';

@Component({
  selector: 'app-add-alarme',
  templateUrl: './add-alarme.component.html',
  styleUrls: ['./add-alarme.component.css']
})
export class AddAlarmeComponent implements OnInit {
  sucesso = false;
  medicamento: any;
  data: string ='';
  time: string ='';
  listaMedicamentos : MedicamentoList[] = []

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getListaMedicamentos()
  }

  adicionar() {
    if (this.data === '' || this.time === '' || this.medicamento === '') {
      return alert('Preencha todos os campos!');
    }

    this.http.post(api + `lembrete`, {
      data: this.data,
      hora: this.time,
      id_medicamento: parseInt(this.medicamento.id),
      id_usuario: this.authService.usuario?.id
    })
    .subscribe((data) => {
      this.sucesso = true
    }, err => {
      alert('Erro ao cadastar alarme')
    }
    );   }

  getListaMedicamentos(){
    this.http.get<MedicamentoList[]>(api + `medicamento/usuario/${this.authService.usuario?.id}`)
    .subscribe((data) => {
      this.listaMedicamentos = data
    }, err => {
      this.listaMedicamentos = []
    }
    ); 
  }

  
}


