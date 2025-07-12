// src/environments/environment.ts - Reemplazar todo el contenido
export const environment = {
  production: false,
  mvp: {
    version: '1.0.0',
    buildDate: new Date().toISOString(),
    features: {
      googleMeetIntegration: true,
      prescriptionModule: true,
      medicalNotesModule: true,
      paymentModule: false,      // Para versión futura
      aiAssistant: false        // Para versión futura
    }
  },
  googleMeet: {
    webClientId: 'TU_WEB_CLIENT_ID.apps.googleusercontent.com',    // ⭐ Cambiar
    androidClientId: 'TU_ANDROID_CLIENT_ID.apps.googleusercontent.com', // ⭐ Cambiar
    iosClientId: 'TU_IOS_CLIENT_ID.apps.googleusercontent.com',     // ⭐ Cambiar
    apiKey: 'AIzaSyDEUAAz48VRz9YFv1ovJzxY_D2fNfjh6RA',  // ⭐ Cambiar
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    ],
    scope: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/meetings.space.created'
    ],
    embedConfig: {
      allowCameraControl: true,
      allowMicrophoneControl: true,
      allowScreenShare: true,
      medicalMode: true
    }
  },
  medical: {
    consultationDuration: {
      normal: 30,           // minutos
      followUp: 15,
      emergency: 60
    },
    allowedFileTypes: ['pdf', 'jpg', 'png', 'jpeg'],
    maxFileSize: 10,        // MB
    autoSaveNotes: true,
    requireMedicalLicense: true,
    minConsultationNotice: 15, // minutos de anticipación mínima
    maxDailyConsultations: 20  // límite por médico
  },
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 30000,         // 30 segundos
    retryAttempts: 3
  },
  storage: {
    prefix: 'medical_teleconsultas_',
    encryptSensitiveData: true
  }
};