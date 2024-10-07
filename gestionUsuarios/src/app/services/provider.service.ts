import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Injectable, inject } from '@angular/core';
import { utils } from '../../config';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Tipo de datos que representa los métodos HTTP comunes utilizados en las solicitudes.
 *
 * @remarks
 * Este tipo forma parte de la plantilla realizada con Angular 17.
 *
 * @beta
 */
export declare type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Servicio que gestiona las solicitudes HTTP a servicios web.
 *
 * @remarks
 * Este servicio forma parte de la plantilla realizada con Angular 17.
 *
 * @beta
 */
@Injectable({
   providedIn: 'root',
})
export class ProviderService {
   _ls: LocalStorageService = inject(LocalStorageService);
   _snack: MatSnackBar = inject(MatSnackBar);
   _http: HttpClient = inject(HttpClient);

  //  excep: any = {
  //     "001": "Método de petición incorrecto",
  //     "002": "Clase incorrecta",
  //     "003": "Método inexistente",
  //     "006": "Token no enviado",
  //     "007": "Parámetros vacíos",
  //     // Login
  //     "004": "El usuario no existe",
  //     "005": "Credenciales inválidas",
  //  }

   /**
    * Realiza una solicitud a los servicios web de forma asíncrona.
    *
    * @remarks
    * Este método forma parte de la plantilla realizada con Angular 17.
    *
    * @template T - Tipo genérico que representa el tipo de datos esperado en la respuesta.
    *
    * @param method - El método HTTP utilizado para la solicitud ('GET', 'POST', 'PUT', 'PATCH' o 'DELETE').
    * @param archivo - La ruta relativa a la URL base para la solicitud.
    * @param params - Parámetros opcionales que se incluirán en la solicitud.
    * @returns Los datos de la respuesta o se rechaza con un error.
    */
   async request<T>(method: Method, archivo: string, opcion: string, params?: any): Promise<T> {
      let url = `${utils.URL}controller/${archivo}.php?opcion=${opcion}`;
      console.log('URL de la solicitud:', url);


      return new Promise<T>((resolve, reject) => {
         this._http
            .request<any>(method, url, {
               body: params,
               headers: this.headers(),
               params: method !== 'POST' ? this.params(params) : {},
            })
            .subscribe({
               next: (response: any) => {
                  resolve(response);
               },
               error: (error) => {
                  reject(error.error_code);
               }
            });
      });
   }

   /**
    * Realiza una solicitud a los servicios de producción de forma asíncrona.
    *
    * @remarks
    * Este método forma parte de la plantilla realizada con Angular 17.
    * @template T - Tipo genérico que representa el tipo de datos esperado en la respuesta.
    *
    * @param method - El método HTTP utilizado para la solicitud ('GET', 'POST', 'PUT', 'PATCH' o 'DELETE').
    * @param url - La URL completa para la solicitud.
    * @param params - Parámetros opcionales que se incluirán en la solicitud.
    * @returns Los datos de la respuesta.
    */
   async production<T>(method: Method, url: string, params?: any): Promise<T> {
      return new Promise<T>((resolve) => {
         this._http
            .request<any>(method, url, {...params})
            .subscribe((response: any) => {
               resolve(response);
            });
      });
   }

   /**
    * Obtiene las cabeceras para las solicitudes HTTP.
    *
    * @remarks
    * Este método forma parte de la plantilla realizada con Angular 17.
    *
    * @returns Las cabeceras HTTP configuradas.
    */
   headers(): HttpHeaders {
      return new HttpHeaders()
         .set('Simpleauthb2b', '4170ae818f2e146c48cf824667947b25');
   }

   /**
    * Convierte los parámetros en una instancia de HttpParams, listos para ser incluidos en una solicitud HTTP.
    *
    * @remarks
    * Este método forma parte de la plantilla realizada con Angular 17.
    *
    * @param params - Los parámetros que se convertirán en una cadena codificada.
    * @returns Una instancia de HttpParams configurada con los parámetros proporcionados.
    */
   params(params: any): HttpParams {
      return new HttpParams().set(
         'params',
         encodeURIComponent(JSON.stringify(params))
      );
   }

}
