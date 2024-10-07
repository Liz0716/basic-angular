import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import { ListadoComponent } from '../components/listado/listado.component';

const routes: Routes = [
  {
    path: 'usuarios',
    children: [
      {
        path: 'crear',
        component: UsuariosComponent
      },
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'editar/:id',
        component: UsuariosComponent
      },
      {
        path: 'detalle/:id',
        component:DetalleComponent
      },
      {
        path: '',
        redirectTo: 'listado',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivadoRoutingModule { }
