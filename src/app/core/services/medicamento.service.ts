import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  constructor(
    private http: HttpClient,
  ) { }

  public get(url: string) {
    return this.http.get(url);
  }

  public save(url: string, data: any) {
    return this.http
      .post<any>(url, data);
  }

  public delete(id: any) {
    return this.http.delete("api/medicamento/eliminar" + `/${id}`)
  }

  public update(url: string, data: any) {
    return this.http
      .put<any>(url, data);
  }

  public filterNombre(url: string,nombre:string){
    return this.http.get(url + `/${nombre}`)
  }

}
