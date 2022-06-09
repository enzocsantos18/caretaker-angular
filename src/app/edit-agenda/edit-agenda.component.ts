import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgendaInfoService } from '../agenda-info.service';
import { AuthService } from '../auth.service';
import api from '../configs/api';
import { MedicamentoList } from '../models/medicamento';

@Component({
  selector: 'app-edit-agenda',
  templateUrl: './edit-agenda.component.html',
  styleUrls: ['./edit-agenda.component.css']
})

export class EditAgendaComponent implements OnInit {
  sucesso = false;

  tipo: string; // se consulta ou lembrete
  item: any; // informações do item
  
  lista: any; // lista para encontrar o item
  listaMedicamentos: any;

  nome = '';
  descricao = '';
  medicamentoNome: string = "";
  medicamentoId: any;
  data: string = '';
  time: string = '';
  requestUrl = "";

  constructor(private http: HttpClient, private authService: AuthService, private route: ActivatedRoute, private info: AgendaInfoService) {
      this.tipo = '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('tipo') === 'consulta') {
        this.lista = this.info.getConsultas();
        this.tipo = 'Consulta';
      } else if (params.get('tipo') === 'lembrete') {
        this.lista = this.info.getAlarmes();
        this.tipo = 'Lembrete';
        this.getMeds();
      }

      const item = this.lista[Number(params.get('id'))];
      console.log(item)
      if (params.get('tipo') === 'consulta') {
        this.nome = item.nome;
        this.data = item.data;
        this.time = item.hora.slice(0,5);
        this.descricao = item.descricao;
        this.requestUrl = api + `consulta/` + item.id
      } else {
        this.data = item.data;
        this.time = item.hora.slice(0,5);
        this.medicamentoNome = item.medicamento.nome;
        this.medicamentoId = item.medicamento.id;
        this.requestUrl = api + `lembrete/` + item.hora + "/" + this.data + "/" + this.medicamentoId
      }


    });
  }

  getMeds() {
    this.http.get<MedicamentoList[]>(api + `medicamento/usuario/${this.authService.usuario?.id}`)
    .subscribe((data) => {
      this.listaMedicamentos = data
    }, err => {
      this.listaMedicamentos = []
    }
    ); 
  }

  confirmar() {
    console.log(this.requestUrl)
    let body
    if (this.tipo === "Lembrete"){
      body = {
        data: this.data,
        hora: this.time + ":00",
        id_medicamento: parseInt(this.medicamentoId),
        id_usuario: this.authService.usuario?.id
      }
    } else {
      body = {
        nome: this.nome,
        data: this.data,
        descricao: this.descricao,
        hora: this.time + ':00',
        id_usuario: this.authService.usuario!.id
      }
    }

    this.http.put(this.requestUrl, body).subscribe((data) => {
    }, err => {
      return alert('Erro ao realizar alterações')
    })

    this.sucesso = true;
  }

}
