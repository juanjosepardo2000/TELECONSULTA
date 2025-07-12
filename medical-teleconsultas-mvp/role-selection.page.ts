import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StorageService, ErrorHandlerService } from '../../../core/services';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.page.html',
  styleUrls: ['./role-selection.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RoleSelectionPage implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    console.log('RoleSelectionPage initialized');
  }

  async selectRole(role: 'doctor' | 'patient') {
    try {
      await this.storageService.set('user_role', role);
      await this.errorHandler.showSuccess(`Rol seleccionado: ${role === 'doctor' ? 'Doctor' : 'Paciente'}`);
      
      if (role === 'doctor') {
        this.router.navigate(['/tabs/tab1']); // Cambié la ruta temporal
      } else {
        this.router.navigate(['/tabs/tab2']); // Cambié la ruta temporal
      }
    } catch (error) {
      await this.errorHandler.handleError(error, 'Error al seleccionar el rol');
    }
  }
}