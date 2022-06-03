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
  selectedDate: Date | null = new Date();

  listaConsulta: Consulta[] = [];
  listaLembrete: Lembrete[] = [];
  lista: General[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getData();
  }

  dateSelect() {}

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
    console.log(this.listaConsulta);
    console.log(this.listaLembrete);

    this.listaLembrete.map((lembrete) => {
      const item = {
        data: this.pipe.transform(lembrete.data, 'dd') ?? '',
        hora: lembrete.hora.substring(0, 5),
        nome: lembrete.medicamento.nome,
      };
      this.lista.push(item);
    });
    this.listaConsulta.map((consulta) => {
      const item = {
        data: this.pipe.transform(consulta.data, 'dd') ?? '',
        hora: consulta.hora.substring(0, 5),
        nome: consulta.nome,
      };
      this.lista.push(item);
    });

    console.log(this.lista);
  }
}
