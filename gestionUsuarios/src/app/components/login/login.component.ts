import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private FormBuilder: FormBuilder = inject(FormBuilder);
  private auth: AuthService = inject(AuthService);
  hide = true;

  Formulario: FormGroup = this.FormBuilder.group({
    usuario: [null, [Validators.required]],
    password: [null, [Validators.required]]
  })

  async Registrar(){
    let login: any =(await this.auth.sign_in(this.Formulario.value.usuario,this.Formulario.value.password) as any)
  }

}
