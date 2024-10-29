import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogginService {

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

  public update(url: string, data: any) {
    return this.http
      .put<any>(url, data);
  }

  public loggin(url: string, values:any):Observable<any>{
    const params = new HttpParams({ fromObject: values });
    return this.http.get(url, {params})
  }

}
