import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layaut',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault(); // відміна дефолтної поведінки зсилки
    this.router.navigate(['/admin', 'login']); // редірект зі стор. аdmin на стор. login при натисканні на кнопку Exit
  }
}
