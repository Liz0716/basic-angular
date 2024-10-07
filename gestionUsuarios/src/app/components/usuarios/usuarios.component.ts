import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  private FormBuilder: FormBuilder = inject(FormBuilder);
  private provider: ProviderService = inject(ProviderService);
  private router: Router = inject(Router);
  private activateRoute: ActivatedRoute = inject(ActivatedRoute);

  infoUsuario: any;
  hide = true;

  Formulario: FormGroup = this.FormBuilder.group({
    id: [undefined],
    nombre: [null, [Validators.required]],
    apellido_materno: [null, [Validators.required]],
    apellido_paterno: [null, [Validators.required]],
    correo: [null, [Validators.required]],
    usuario: [null, [Validators.required]],
    password: [null, [Validators.required]],
    calle_numero: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    fecha_nacimiento: [null, [Validators.required]]
  })

  async ngAfterViewInit() {
    if(this.router.url.includes("editar")){
      const id =  this.activateRoute.snapshot.paramMap.get("id");
      this.infoUsuario = await this.provider.request('POST','usuario','GetId', {id:id})
      this.Formulario.patchValue(this.infoUsuario);
    }
  }

  async guardarinfo(){
    if(this.Formulario.valid){
      if(this.router.url.includes("editar")){
        await this.provider.request('POST','usuario','Update', this.Formulario.value);
      }else{
        await this.provider.request('POST','usuario','Insert', this.Formulario.value);

      }
      this.router.navigate(['privado/usuarios']);
    }
  }
}








