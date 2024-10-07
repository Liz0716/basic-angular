import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private ls = typeof window !== 'undefined' ? window.localStorage : undefined;

  public _set(key: string, value: any): boolean {
    this.ls?.setItem(key, JSON.stringify(value));
    return true;
  }

  public _get(key: string): any {
    return JSON.parse(this.ls?.getItem(key) || 'null');
  }

  public update(key: string, value: any[]): boolean {
    this.remove(key);
    return this._set(key, value);
  }

  public remove(key: string): boolean {
    this.ls?.removeItem(key);
    return true;
  }

  public clear(): boolean {
    this.ls?.clear();
    return true;
  }
}
