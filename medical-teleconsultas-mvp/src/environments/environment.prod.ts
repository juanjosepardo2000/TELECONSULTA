// src/environments/environment.prod.ts - Reemplazar todo el contenido
export const environment = {
  production: true,
  mvp: {
    version: '1.0.0',
    buildDate: new Date().toISOString(),
    features: {
      googleMeetIntegration: true,
      prescriptionModule: true,
      medicalNotesModule: true,
      paymentModule: false,
      aiAssistant: false
    }
  },
  googleMeet: {
    webClientId: '324887969732-j3git3eg1m77j5k442ud3upmojdh5djf.apps.googleusercontent.com',
    androidClientId: '324887969732-2g7ngo3ta9etbks07ebum97ghfkbo8fh.apps.googleusercontent.com',
    iosClientId: 'TU_IOS_CLIENT_ID_PROD.apps.googleusercontent.com',
    apiKey: 'AIzaSyDEUAAz48VRz9YFv1ovJzxY_D2fNfjh6RA',
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
      normal: 30,
      followUp: 15,
      emergency: 60
    },
    allowedFileTypes: ['pdf', 'jpg', 'png', 'jpeg'],
    maxFileSize: 10,
    autoSaveNotes: true,
    requireMedicalLicense: true,
    minConsultationNotice: 15,
    maxDailyConsultations: 20
  },
  api: {
    baseUrl: 'https://api.medical-teleconsultas.com/api',
    timeout: 30000,
    retryAttempts: 3
  },
  storage: {
    prefix: 'medical_teleconsultas_',
    encryptSensitiveData: true
  }
};