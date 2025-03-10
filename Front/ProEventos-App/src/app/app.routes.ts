import { Routes } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';

export const routes: Routes = [
   {path: 'eventos', component: EventosComponent},
   {path: 'palestrantes', component: PalestrantesComponent},
   {path: 'contatos', component: ContatosComponent},
   {path: 'dashboard', component: DashboardComponent},
   {path: 'perfil', component: PerfilComponent},
   {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
   {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];
