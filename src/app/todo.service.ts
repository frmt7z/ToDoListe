import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpResponse} from './models/http-response';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = 'http://localhost/apitodo'

  constructor(private http: HttpClient) { }


  // GET ALL
  getAll() {
    return this.http.get(`${this.baseUrl}/list.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  // DELETE
  delete(data: any): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${this.baseUrl}/delete.php?id=` + data).pipe(
      map(data => data));
  }


  // STORE
  store(data: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.baseUrl}/store.php`, data).pipe(
      map(data => data));
  }
}
