import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AddMedicComponent } from './add-medic/add-medic.component';
import { AgendaComponent } from './agenda/agenda.component';

import { AppComponent } from './app.component';
import { AreaPacienteComponent } from './area-paciente/area-paciente.component';
import { IntroComponent } from './intro/intro.component';
import { AddAlarmeComponent } from './add-alarme/add-alarme.component';
import { AddConsultasComponent } from './add-consultas/add-consultas.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthService } from './auth.service';
import { LoggedInGuard } from './login.guard';
import { AuthInterceptor } from './auth.interceptor';
import {
  DlDateTimeDateModule,
  DlDateTimePickerModule,
} from 'angular-bootstrap-datetimepicker';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    RouterModule.forRoot([
      { path: 'app', component: AppComponent, canActivate: [LoggedInGuard] },
      { path: '', component: IntroComponent },
      {
        path: 'main',
        component: AreaPacienteComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'medicamento',
        component: AddMedicComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'agenda',
        component: AgendaComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'consulta',
        component: AddConsultasComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'alarme',
        component: AddAlarmeComponent,
        canActivate: [LoggedInGuard],
      },
      { path: 'cadastro', component: CadastroComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    AreaPacienteComponent,
    AddMedicComponent,
    AgendaComponent,
    IntroComponent,
    AddAlarmeComponent,
    AddConsultasComponent,
    CadastroComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    LoggedInGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
