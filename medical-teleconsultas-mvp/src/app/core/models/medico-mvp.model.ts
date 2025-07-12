// src/app/core/models/medico-mvp.model.ts
export interface MedicoMVP {
  id: string;
  datosPersonales: DatosPersonalesMedico;
  datosLaborales: DatosLaboralesMedico;
  configuracion: ConfiguracionMedico;
  estadisticas: EstadisticasMedico;
  
  // Google Auth Data
  googleAuthData?: GoogleAuthMedico;
  
  // Estado del médico
  estadoActual: EstadoMedico;
  ultimaActividad: Date;
}

export interface DatosPersonalesMedico {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  genero: 'masculino' | 'femenino' | 'otro' | 'prefiero_no_decir';
  fotoPerfil?: string;
  pais: string;
  ciudad: string;
}

export interface DatosLaboralesMedico {
  especialidad: string;
  subespecialidades: string[];
  numeroLicencia: string;
  universidadTitulo: string;
  anioTitulacion: number;
  certificaciones: Certificacion[];
  experienciaAnios: number;
  idiomas: string[];
  tarifaConsulta: number;
  moneda: string;
}

export interface Certificacion {
  nombre: string;
  entidadEmisora: string;
  fechaObtencion: Date;
  fechaVencimiento?: Date;
  numeroCredencial: string;
  verificado: boolean;
}

export interface ConfiguracionMedico {
  horarioAtencion: HorarioAtencion[];
  duracionConsultaDefecto: number;
  permitePacientesNuevos: boolean;
  requiereAprobacionCitas: boolean;
  notificacionesEmail: boolean;
  notificacionesPush: boolean;
  zonaHoraria: string;
}

export interface HorarioAtencion {
  dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
  horaInicio: string; // HH:mm format
  horaFin: string;    // HH:mm format
  activo: boolean;
}

export interface EstadisticasMedico {
  totalConsultas: number;
  consultasUltimoMes: number;
  calificacionPromedio: number;
  totalPacientes: number;
  horasTotalesConsulta: number;
}

export interface GoogleAuthMedico {
  googleId: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiry: Date;
  calendarId: string;
}

export type EstadoMedico = 
  | 'disponible' 
  | 'en_consulta' 
  | 'ocupado' 
  | 'desconectado' 
  | 'vacaciones';