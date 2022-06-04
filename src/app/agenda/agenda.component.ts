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
  prev: any
  next: any
  get_buttons: any

  listaConsulta: Consulta[] = [];
  listaLembrete: Lembrete[] = [];
  lista: General[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.prev = false;
    this.next = false;
  }

  ngOnInit() {
    this.getData();
    this.getSelectedDate();

    // Clicar nas setas não altera automaticamente o mês, então temos que fazer isso
    // manualmente para mostras os items por mês. Esse intervalo cria um event listener
    // para quando esses botões forem clicados chama a função correta
    this.get_buttons = setInterval(()=> {
      this.prev = document.getElementsByClassName("dl-abdtp-left-button")[0];
      this.next = document.getElementsByClassName("dl-abdtp-right-button")[0];
      // bind é necessário para events listeners para alcançar itens em 'this'
      this.prev.addEventListener('click', this.prevMes.bind(this));
      this.next.addEventListener('click', this.nextMes.bind(this));
      this.clear();
    }, 1000)
  }

  // Uma vez que conseguirmos o event listener, paramos o set interval
  clear() {
    if (this.prev && this.next) {
      clearInterval(this.get_buttons)
    }
  }

  prevMes() {
    var prev_mes = this.data_selecionada[1]
    var ano = this.data_selecionada[2]
    prev_mes = parseInt(prev_mes) - 1
    
    // Ao clicar 
    if (prev_mes < 10 && prev_mes > 0) {
      this.data_selecionada[1] = '0' + prev_mes.toString()
    } else if (prev_mes < 1) {
      this.data_selecionada[1] = '12'
      ano = parseInt(ano) - 1
      this.data_selecionada[2] = ano.toString()
    } else {
      this.data_selecionada[1] = prev_mes.toString()
    }
    this.orderByDate();
  }

  nextMes() {
    var next_mes = this.data_selecionada[1]
    var ano = this.data_selecionada[2]
    next_mes = parseInt(next_mes) + 1

    if (next_mes < 10 && next_mes > 0) {
      this.data_selecionada[1] = '0' + next_mes.toString()
    } else if (next_mes > 12) {
      this.data_selecionada[1] = '01'
      ano = parseInt(ano) + 1
      this.data_selecionada[2] = ano.toString()
    } else {
      this.data_selecionada[1] = next_mes.toString()
    }
    this.orderByDate();
  }

  selecionarData() {
    
  }

  getSelectedDate() {
    if (this.selectedDate !== undefined) {
      // en-GB formata a data para mostrar dias e meses com dois digitos
      // assim como está salvo no banco de dados já em string
      const hoje = new Intl.DateTimeFormat('en-GB').format(this.selectedDate).split('/');
      return this.data_selecionada = hoje
    }
    return false
  }

  apagarEvento(id : any){
    alert('O evento de id ' + id + ' irá ser apagado')
  }

  getData() {
    // Preenche as listas de lembrete e consultas
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

                // Ordena e preenche a lista que aparece embaixo do calendário
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
    // Listas anteriores são limpadas
    this.lista = []
    // Reorderna os lembretes e consultas que vão aparecer na tela pelo mês e ano
    this.listaLembrete.map((lembrete) => {
      const item = {
        data: this.pipe.transform(lembrete.data, 'dd') ?? '',
        hora: lembrete.hora.substring(0, 5),
        nome: lembrete.medicamento.nome,
      };
      const data_lembrete = lembrete.data.split('-')
      if (!this.data_selecionada) {return} // se não há data selecionada, interrompe a função
      if (this.data_selecionada[1] === data_lembrete[1] && // meses
          this.data_selecionada[2] === data_lembrete [0]) { // anos
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
      if (this.data_selecionada[1] === data_consulta[1] && // meses
          this.data_selecionada[2] === data_consulta [0]) { // anos
            this.lista.push(item);
      }
    });
  }
}
