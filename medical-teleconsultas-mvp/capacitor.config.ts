// capacitor.config.ts - Reemplazar todo el contenido
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.medical.teleconsultas',
  appName: 'Medical Teleconsultas MVP',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/meetings.space.created'
      ],
      serverClientId: 'TU_WEB_CLIENT_ID.apps.googleusercontent.com', // ⭐ Cambiar por tu Web Client ID
      forceCodeForRefreshToken: true,
      
      // Configuración específica para @codetrix-studio/capacitor-google-auth
      androidClientId: 'TU_ANDROID_CLIENT_ID.apps.googleusercontent.com', // ⭐ Cambiar por tu Android Client ID
      iosClientId: 'TU_IOS_CLIENT_ID.apps.googleusercontent.com', // ⭐ Cambiar por tu iOS Client ID
      
      // Configuración adicional para teleconsultas médicas
      prompt: 'select_account',
      accessType: 'offline'
    },
    Camera: {
      permissions: ['camera', 'microphone']
    },
    Device: {
      permissions: ['camera', 'microphone']
    }
  }
};

export default config;