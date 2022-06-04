import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Consulta } from '../models/consulta';

import api from '../configs/api';
import { Lembrete } from '../models/lembrete';
import { General } from '../models/general';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})

export class AgendaComponent {
  pipe = new DatePipe('en-US');
  data: string | null = '';
  minuteStep = 5;
  selectedDate: Date = new Date();
  data_selecionada: any

  listaConsulta: Consulta[] = [];
  listaLembrete: Lembrete[] = [];
  lista: General[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  ngOnInit() {
    this.getData();
    this.getSelectedDate();
  }

  dateSelect() {
    console.log(this.selectedDate)
  }

  getSelectedDate() {
    if (this.selectedDate !== null) {
      // en-GB formata a data para mostrar dias e meses com dois digitos
      // assim como está salvo no banco de dados
      const hoje = new Intl.DateTimeFormat('en-GB').format(this.selectedDate).split('/');
      return this.data_selecionada = hoje
    }
    return false
  }

  apagarEvento(id : any){
    alert('O evento de id ' + id + ' irá ser apagado')
  }

  getData() {
    this.http
      .get<Lembrete[]>(api + `lembrete/usuario/${this.authService.usuario?.id}`)
      .subscribe(
        (data) => {
          this.listaLembrete = data;

          this.http
            .get<Consulta[]>(
              api + `consulta/usuario/${this.authService.usuario?.id}`
            )
            .subscribe(
              (data) => {
                this.listaConsulta = data;

                this.orderByDate();
              },
              (err) => {
                this.listaConsulta = [];
              }
            );
        },
        (err) => {
          this.listaConsulta = [];
        }
      );
  }

  orderByDate() {
    // console.log(this.listaConsulta);
    // console.log(this.listaLembrete);

    this.listaLembrete.map((lembrete) => {
      const item = {
        data: this.pipe.transform(lembrete.data, 'dd') ?? '',
        hora: lembrete.hora.substring(0, 5),
        nome: lembrete.medicamento.nome,
      };
      const data_lembrete = lembrete.data.split('-')
      if (!this.data_selecionada) {return} // se não há data selecionada, interrompe a função

      if (this.data_selecionada[1] === data_lembrete[1] && // mesmo mês do atual do calendário
          this.data_selecionada[2] === data_lembrete [0]) { // mesmo ano do atual do calendário
            this.lista.push(item);
      }
    });
    this.listaConsulta.map((consulta) => {
      const item = {
        data: this.pipe.transform(consulta.data, 'dd') ?? '',
        hora: consulta.hora.substring(0, 5),
        nome: consulta.nome,
      };
      const data_consulta = consulta.data.split('-')
      if (!this.data_selecionada) {return} // se não há data selecionada, interrompe a função

      if (this.data_selecionada[1] === data_consulta[1] && // mesmo mês do atual do calendário
          this.data_selecionada[2] === data_consulta [0]) { // mesmo ano do atual do calendário
            this.lista.push(item);
      }
    });
  }
}
