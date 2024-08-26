import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
// import * as jwt from 'jsonwebtoken';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8081/userdetails';
  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) {}

  login(details: any): Observable<any> {
    return this.http.post<any>('http://localhost:8081/userdetails',details).pipe(
      map(response => {
        const decodedToken = this.decodeToken(response);
        // if (user) {
        //   localStorage.setItem('authToken', response.token);
        // }
        console.log(decodedToken.users)
        // const uservalue = this.jwtHelper.decodeToken(response: any[]);
        return decodedToken.users;
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

    registered(data: any) {
      return this.http.post<any>(this.baseUrl,data).pipe(map(res => {
        return res;
      }
      ));
    }
    updated(id: any,data: any) {
      return this.http.put<any>(`http://localhost:8081/userdetails/${id}`,data).pipe(map(res => {
        sessionStorage.setItem('userid', res.id.toString());
        return res;
      }
      ));
    }

    IsloggedIn() {
      return sessionStorage.getItem('userid') !=null;
    }

    IsuserRole() {
      return sessionStorage.getItem('userrole') !=null?sessionStorage.getItem('userrole')?.toString():'';
    }

    getUserId(): string | null {
      return sessionStorage.getItem('userid');
    }
    getUserRole(): string | null {
      return sessionStorage.getItem('userid');
    }

    getuserDetails(id: any) {
      return this.http.get<any>(this.baseUrl).pipe(map(res => {
        return res;
      }
      ));
    }

   
}