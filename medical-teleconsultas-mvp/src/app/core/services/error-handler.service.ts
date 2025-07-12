import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async handleError(error: any, userMessage?: string): Promise<void> {
    console.error('Error occurred:', error);

    let message = userMessage || 'Ha ocurrido un error inesperado';
    
    // Mapear errores específicos médicos
    if (error?.status === 401) {
      message = 'Sesión expirada. Por favor, inicia sesión nuevamente';
    } else if (error?.status === 403) {
      message = 'No tienes permisos para realizar esta acción médica';
    } else if (error?.status === 404) {
      message = 'Consulta médica no encontrada';
    } else if (error?.status >= 500) {
      message = 'Error del servidor médico. Intenta más tarde';
    } else if (error?.message?.includes('Google')) {
      message = 'Error de conectividad con Google Meet. Verifica tu internet';
    } else if (error?.message?.includes('Calendar')) {
      message = 'Error al acceder al calendario médico';
    } else if (error?.message) {
      message = error.message;
    }

    await this.showToast(message, 'danger');
  }

  async showToast(message: string, color: string = 'primary'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      position: 'bottom',
      color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    
    await toast.present();
  }

  async showAlert(header: string, message: string, buttons?: any[]): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: buttons || ['OK']
    });
    
    await alert.present();
  }

  async showConfirm(
    header: string, 
    message: string, 
    confirmText: string = 'Confirmar',
    cancelText: string = 'Cancelar'
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: confirmText,
            handler: () => resolve(true)
          }
        ]
      });
      
      await alert.present();
    });
  }

  // Métodos específicos para errores médicos
  async showMedicalError(type: 'consultation' | 'authentication' | 'connection'): Promise<void> {
    const messages = {
      consultation: 'Error en la teleconsulta. Verifica tu conexión e intenta nuevamente.',
      authentication: 'Error de autenticación médica. Verifica tus credenciales.',
      connection: 'Error de conexión. Verifica tu internet para continuar con la consulta.'
    };

    await this.showToast(messages[type], 'danger');
  }

  async showSuccessMessage(message: string): Promise<void> {
    await this.showToast(message, 'success');
  }

  async showWarningMessage(message: string): Promise<void> {
    await this.showToast(message, 'warning');
  }
}