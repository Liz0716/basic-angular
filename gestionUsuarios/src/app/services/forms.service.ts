import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject, firstValueFrom } from 'rxjs';
import { ProviderService, Method } from './provider.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _provider: ProviderService = inject(ProviderService);
  private _dialog: MatDialog = inject(MatDialog);

  ejecutar = new Subject<void>();
  ejecutar$ = this.ejecutar.asObservable();

  async patch<T extends AbstractControl>(data: any, form_group: T): Promise<boolean> {
    for (const key in data) {
      const control = form_group.get(key);
      if (control instanceof FormControl) {
        control.patchValue(data[key]);
      } else if (control instanceof FormGroup) {
        while (typeof data?.[key] === 'string') data[key] = JSON.parse(data?.[key]);
        this.patch(data[key], control);
      } else if (control instanceof FormArray && Array.isArray(data[key])) {
        const form_array = this.control(control);
        const data_array = data[key];
        let i = form_array.length;

        this.control(control).clear();

        while (i < data_array.length) {
          const sub_group = new FormGroup({});
          data_array[i] &&
            Object.keys(data_array[i]).forEach((sub_key) =>
              sub_group.addControl(sub_key, data_array[i][sub_key])
            );
          form_array.push(sub_group);
          i++;
        }

        data_array.forEach((value: any, index: number) => {
          const sub_group = this.control(form_array.at(index));
          this.patch(value, sub_group);
        });

        while (form_array.length > data_array.length) form_array.removeAt(form_array.length - 1);
      }
    }
    return true;
  }

  control<T extends AbstractControl>(control: T): T {
    return control;
  }

  empty(form: any): boolean {
    return Object.values(form).every(
      (key: any) => key == null || key == 'null' || (typeof key == 'string' && key.length == 0)
    );
  }

  control_name(control: AbstractControl): string {
    const group = <FormGroup>control.parent;
    if (!group) return '';
    let name = '';
    Object.keys(group.controls).forEach((key) => {
      if (group.get(key) === control) name = key;
    });
    return name;
  }

  async save(
    method: Method,
    archivo: string,
    opcion: string,
    params: any,
    button: string,
    form_id: string
  ): Promise<any> {
    try {
      const response: any = await this._provider.request(method, archivo, opcion, params);
      this.ejecutar.next();
      return response;
    } catch (error) {
    } finally {
    }
  }

  async delete(method: Method, archivo: string, opcion: string, params: any) {
    const response: any = await this._provider.request(method, archivo, opcion, params);
    const success = response.estatus === true;
    this.ejecutar.next();
  }
}
