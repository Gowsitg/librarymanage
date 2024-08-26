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

  getuserId(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/regdetaile/`).pipe(
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

  borrowedBooks(data: any,id:any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/bookDetails/${id}`,data).pipe(
      map(res => {
        return res;
      }),
    );
  }

  addbooks(data: any,value: any): Observable<any> {
    const requestData = {
      [data.id]: {
        bookdata: value,
        
      },
    }
    return this.http.post<any>(`http://localhost:3000/bookDetails`,requestData).pipe(
      map(res => {
        return res;
      }),
    );
  }

  buyBooks(value: any, buyerdata:any,status: any,borrowed: any,count: any): Observable<any> {

    const requestData = {
      [value.bookid]: {
        bookdata: value,borrowed,status,buyerdata,count
      },
    }
    return this.http.post<any>(`http://localhost:3000/userBooks`, requestData).pipe(
      map(res => {
        return res;
      }),
    );
  }

  updatebuyBooks(value: any, buyerdata:any,status: any,borrowed: any,count: any,returned: any,crtid: any): Observable<any> {

    const requestData = {
      [value.bookid]: {
        bookdata: value,borrowed,status,buyerdata,count,returned
      },
    }
    return this.http.put<any>(`http://localhost:3000/userBooks/${crtid}`, requestData).pipe(
      map(res => {
        return res;
      }),
    );
  }
  booksBorrowed(): Observable<any> {

    return this.http.get<any>(`http://localhost:3000/userBooks`).pipe(
      map(res => {
        return res;
      }),
    );
  }
  //   returnBooks(value: any): Observable<any> {
  //     const requestData = {
  //       [value.bookid]: {
  //         bookdata: value,borrowed,status,buyerdata,count,
  //       },
  //     }
  //   return this.http.put<any>(`http://localhost:3000/userBooks/${value}`,).pipe(
  //     map(res => {
  //       return res;
  //     }),
  //   );
  // }

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
