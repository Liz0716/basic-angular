import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { utils } from '../../config';
import { ProviderService } from './provider.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _ls: LocalStorageService = inject(LocalStorageService);
  private _provider: ProviderService = inject(ProviderService);
  private _router: Router = inject(Router);

  async sign_in(usuario: string, password: string) {
    let login: any = await this._provider.request('POST', 'login', 'Login', { usuario, password });
    console.log(login);

    if (login.estatus == true) {
      await this._ls._set(utils.USER, await this._provider.request('POST', 'login', 'Login', { usuario, password }));
      this._router.navigateByUrl("/privado/usuarios")
      return this._ls._get(utils.USER);
    }
    return false;
  }

  async sign_up(Form: any) {
    return await this._provider.request('POST', 'usuario', 'Insert', Form);
  }

  async sign_out() {
    await this._ls.clear();
    await this._router.navigate(['/login']);
  }
  get_user(): any {
    return this._ls._get(utils.USER) ?? null;
  }

  logged_in(): boolean {
    return !!this.get_user();
  }
}
