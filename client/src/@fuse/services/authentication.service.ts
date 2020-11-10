import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../app/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post(`/account/login`, model).pipe(
      map((response: any) => {

         const token = response.token;
         const id = response.id;

         if (token) {

           // save the token from the response to the local storage
           localStorage.setItem('token', JSON.stringify(token));
           localStorage.setItem('id', JSON.stringify(id));

           // get the user with the coresponding id
           this.getCurrentUser(id).subscribe(data => {
             this.currentUserSource.next(new User(data));
           });
         }
      })
    );
  }

  getCurrentUser(userId: number): Observable<User> {
    return this.http.get<User>(`/users/${userId}`);
  }

  setCurrentUser(user: User): void {
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.currentUserSource.next(null);
  }

  register(model: any): Observable<any> {
    return this.http.post(`/account/register`, model).pipe(
      map((response: any) => {
        
        const token = response.token;
        const id = response.id;

        if (token) {

          // save the token from the response to the local storage
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('id', JSON.stringify(id));

          // get the user with the coresponding id
          this.getCurrentUser(id).subscribe(data => {
            this.currentUserSource.next(new User(data));
          });
        }
     })
    );
  }
}
