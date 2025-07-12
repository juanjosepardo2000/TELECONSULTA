// src/app/core/models/paciente-mvp.model.ts
export interface PacienteMVP {
  id: string;
  datosPersonales: DatosPersonalesPaciente;
  datosMedicos: DatosMedicosPaciente;
  configuracion: ConfiguracionPaciente;
  historial: HistorialPaciente;
  
  // Google Auth Data
  googleAuthData?: GoogleAuthPaciente;
  
  // Estado del paciente
  ultimaActividad: Date;
  cuentaVerificada: boolean;
}

export interface DatosPersonalesPaciente {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  genero: 'masculino' | 'femenino' | 'otro' |