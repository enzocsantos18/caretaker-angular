import { Injectable } from '@angular/core';

@Injectable()
export class AgendaInfoService {
	listaConsultas: any;
  	listaAlarmes: any;

	constructor() {}

	getConsultas() {
		return this.listaConsultas;
	}

	getAlarmes() {
		return this.listaAlarmes;
	}

	setConsultas(data: any[]) {
		this.listaConsultas = data;
	}

	setAlarmes(data: any[]) {
		this.listaAlarmes = data;
	}

}