import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {FbCreateResonse, Post} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})  // реєстрація в корні бля використання зовні
export class PostsService {
  constructor(
    private http: HttpClient,
  ) { }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map( (response: FbCreateResonse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
      })
    );
  }
}
