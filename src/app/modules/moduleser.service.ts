import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleserService {
  private baseUrl = 'http://localhost:3000/regdetaile';

  constructor(private http: HttpClient) {}

  getUser(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/regdetaile/${id}`).pipe(
      map(res => {
        return res;
      }),
    );
  }

  getBooks(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/bookDetails/`).pipe(
      map(res => {
        return res;
      }),
    );
  }

  addbooks(value: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/bookDetails`,value).pipe(
      map(res => {
        return res;
      }),
    );
  }

  buyBooks(value: any, buyerdata:any,status: any,borrowed: any,returned: any): Observable<any> {

    const requestData = {
      [value.bookid]: {
        bookdata: value,
        buyerdata: buyerdata,
        status: status,
        borrowed: borrowed,
        returned: returned,
      },
    }
    return this.http.post<any>(`http://localhost:3000/userBooks`, requestData).pipe(
      map(res => {
        return res;
      }),
    );
  }
    returnBooks(value: any, buyerdata:any,currentid: any,status: any,borrowed: any,returned: any): Observable<any> {

    const requestData = {
      [value.bookid]: {
        bookdata: value,
        buyerdata: buyerdata,
        status: status,
        borrowed: borrowed,
        returned: returned,
      },
    }
    return this.http.put<any>(`http://localhost:3000/userBooks/${currentid}`, requestData).pipe(
      map(res => {
        return res;
      }),
    );
  }

  updatedBooks(id: any,value: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/bookDetails/${id}`,value).pipe(
      map(res => {
        return res;
      }),
    );
  }

  borrowDetails(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/userBooks`).pipe(
      map(res => {
        return res;
      }),
    );
  }

  getborrow(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/userBooks/${id}`).pipe(
      map(res => {
        return res;
      }),
    );
  }

}
