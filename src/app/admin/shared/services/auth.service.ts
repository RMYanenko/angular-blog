import {Injectable} from '@angular/core';
import {Observable, pipe, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

import {FbAuthResponse, User} from '../../../shared/interfaces';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp')); // перевірка дати
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  // @ts-ignore
  login(user: User): Observable<any> { // метод входа в систему
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.heandleError.bind(this)) // bind (this) щоб не було втрати контексту
    );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private heandleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    console.log(message);

    switch (message) { // відображення помилок які надсилае Fb коли вводяться невірні дані
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Not found email');
        break;

      case 'INVALID_PASSWORD':
        this.error$.next('Incorrect password');
        break;

      case 'INVALID_EMAIL':
        this.error$.next('Incorrect email');
        break;
    }

    return throwError(error);
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else  {
      localStorage.clear();
    }
  }
}
