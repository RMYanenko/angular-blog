import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {User} from '../../../shared/interfaces';


@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  get token(): string {
    return '';
  }

  // @ts-ignore
  login(user: User): Observable<any> { // метод входа в систему
    this.http.post('', user);
  }

  logout(user: User) {
    // this.http.post('', user);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {}
}
