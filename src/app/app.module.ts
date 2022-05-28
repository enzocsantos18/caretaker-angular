import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InfoService } from 'src/app/info.service';
import { AddMedicComponent } from './add-medic/add-medic.component';
import { AgendaComponent } from './agenda/agenda.component';

import { AppComponent } from './app.component';
import { AreaPacienteComponent } from './area-paciente/area-paciente.component';
import { IntroComponent } from './intro/intro.component';
import { AddAlarmeComponent } from './add-alarme/add-alarme.component';
import { AddConsultasComponent } from './add-consultas/add-consultas.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'app', component: AppComponent },
      { path: '', component: IntroComponent },
      { path: 'main', component: AreaPacienteComponent },
      { path: 'medicamento', component: AddMedicComponent },
      { path: 'agenda', component: AgendaComponent },
      { path: 'consulta', component: AddConsultasComponent},
      { path: 'alarme', component:AddAlarmeComponent},
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
  ],
  bootstrap: [AppComponent],
  providers: [InfoService],
})
export class AppModule { }
