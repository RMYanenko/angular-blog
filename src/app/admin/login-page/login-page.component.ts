import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

    const user: User = { // підключення інтерфейса User для передачі обєкта user при вході
      email: this.form.value.email,
      password: this.form.value.password
    }


    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
    });


  }
}
