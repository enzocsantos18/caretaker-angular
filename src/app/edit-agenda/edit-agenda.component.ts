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
  medicamento: any;
  data: string = '';
  time: string = '';

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
        this.time = item.hora;
        this.descricao = item.descricao;
      } else {
        this.data = item.data;
        this.time = item.hora;
        this.medicamento = item.medicamento.nome;
        console.log(item.medicamento.nome)
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
    this.http.put(api + '/agenda/').subscribe((data) => {
      this.sucesso = true;
    }, err => {
      return alert('Erro ao editar')
    })
  }

}
