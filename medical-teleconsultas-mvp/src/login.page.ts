
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('LoginPage initialized');
  }

}