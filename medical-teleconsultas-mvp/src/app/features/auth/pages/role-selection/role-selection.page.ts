import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.page.html',
  styleUrls: ['./role-selection.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RoleSelectionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('RoleSelectionPage initialized');
  }

  selectRole(role: 'doctor' | 'patient') {
    console.log('Rol seleccionado:', role);
    // Navegación temporal a tabs existentes
    if (role === 'doctor') {
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.router.navigate(['/tabs/tab2']);
    }
  }
}
