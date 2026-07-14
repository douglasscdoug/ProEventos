import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';

import { EventosComponent } from './components/eventos/eventos.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

import { PerfilComponent } from './components/user/perfil/perfil.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ParceirosComponent } from './components/parceiros/parceiros.component';
import { ParceiroListaComponent } from './components/parceiros/parceiro-lista/parceiro-lista.component';
import { ParceiroDetalheComponent } from './components/parceiros/parceiro-detalhe/parceiro-detalhe.component';

export const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [authGuard],
      children: [
         { path: 'user', redirectTo: 'user/perfil' },
         { path: 'user/perfil', component: PerfilComponent },
         { path: 'eventos', redirectTo: 'eventos/lista' },
         {
            path: 'eventos', component: EventosComponent,
            children: [
               { path: 'detalhe/:id', component: EventoDetalheComponent },
               { path: 'detalhe', component: EventoDetalheComponent },
               { path: 'lista', component: EventoListaComponent }
            ]
         },
         { path: 'palestrantes', component: PalestrantesComponent },
         { path: 'parceiros', redirectTo: 'parceiros/lista'},
         { 
            path: 'parceiros', component: ParceirosComponent,
            children: [
               {path: 'lista', component: ParceiroListaComponent},
               {path: 'detalhe', component: ParceiroDetalheComponent},
               {path: 'detalhe/:id', component: ParceiroDetalheComponent}
            ]
         },
         { path: 'dashboard', component: DashboardComponent },
      ]
   },
   {
      path: 'user', component: UserComponent,
      children: [
         { path: 'login', component: LoginComponent },
         { path: 'registration', component: RegistrationComponent }
      ]
   },
   { path: 'home', component: HomeComponent },
   { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
