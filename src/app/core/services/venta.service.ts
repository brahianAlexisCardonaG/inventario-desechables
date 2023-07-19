import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  //module: string = 'venta/';

  constructor(
    private http: HttpClient,
  ) { }

  //CON ENVIRONMENTS
  // public get(url: string) {
  //   return this.http.get(`${environment.apiUrl}/${this.module}`+url);
  // }

  public get(url: string) {
    return this.http.get(url);
  }

  public sale(url: any, id: number, data: any) {
    return this.http.post<any>(url + `/${id}`, data)
  }

  public filterFecha(url: string, fecha: string) {
    return this.http.get(url + `/${fecha}`)
  }

}
