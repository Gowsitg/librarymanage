import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/regdetaile';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(userData => {
        const user = userData.find(user =>
          ((user.name === username || user.emailid === username || user.moblienumber === username ) && user.password === password)
        );

        if(user) {
          const token = 'fake-jwt-token';  
          sessionStorage.setItem('userid', user.id.toString());
          sessionStorage.setItem('userrole', user.role.toString());
          sessionStorage.setItem('access_token', token);
          return user; 
        } else {
          throw new Error('Username or password is incorrect');
        }
      }),
      catchError(error => {
        return throwError(error.message);
      })
    );
  }

    registered(data: any) {
      return this.http.post<any>(this.baseUrl,data).pipe(map(res => {
        return res;
      }
      ));
    }
    updated(id: any,data: any) {
      return this.http.put<any>(`http://localhost:3000/regdetaile/${id}`,data).pipe(map(res => {
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