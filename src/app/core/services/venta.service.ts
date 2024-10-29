import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public get(url: string, values:any) {
    const params = new HttpParams({ fromObject: values });
    return this.http.get(url, {params})
  }

  sale(url: string, ventas: any[]): Observable<any> {
    return this.http.post(url, ventas, { responseType: 'text' });
  }

}
