import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private http: HttpClient,
  ) { }

  public get(url: string) {
    return this.http.get(url);
  }

  public sale(url:any, data:any){
    return this.http.post<any>(url, data)
  }

}
