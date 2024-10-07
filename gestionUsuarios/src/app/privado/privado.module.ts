import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ListadoComponent } from '../components/listado/listado.component';
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrivadoRoutingModule } from './privado-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DetalleComponent,
    ListadoComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    PrivadoRoutingModule,
    HttpClientModule
  ]
})
export class PrivadoModule { }
