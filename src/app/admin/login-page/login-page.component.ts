import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private  route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please log in';
      } else if (params['authFailed']) {
        this.message = 'Please log in again';
      }
    });

    this.form = new FormGroup({ // ініціалізація форми, валідація має два контроли пароль і мейл
      email: new FormControl(null, [
        Validators.required,
        Validators.email // повинен бути мейлом
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6) // min password six numbers
      ])
    });
  }

  submit() {
    console.log(this.form);
    if (this.form.invalid) {
      return; // якщо форма не валідна повертає назад
    }

    this.submitted = true;

    const user: User = { // підключення інтерфейса User для передачі обєкта user при вході
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, error => {
      this.submitted = false;
    });


  }
}
