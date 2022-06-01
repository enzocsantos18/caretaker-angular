import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import api from './configs/api';
import { UsuarioAutenticado, UsuarioLogin } from './models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioAutenticado | null = null
  constructor(private http: HttpClient) { }

  login(dados: UsuarioLogin): Observable<any> {
    return this.http.post<UsuarioAutenticado>(api + "login", dados);
  }

  sair(){
    this.usuario = null
  }

  isLogado() :boolean {
    return this.usuario != null
  }

}
