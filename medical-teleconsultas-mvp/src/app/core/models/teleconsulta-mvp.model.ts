// src/app/core/models/teleconsulta-mvp.model.ts
export interface TeleconsultaMVP {
  id: string;
  medicoId: string;
  pacienteId: string;
  fechaHora: Date;
  duracionMinutos: number;
  estado: EstadoConsulta;
  tipoConsulta: TipoConsulta;
  
  // Integración Google Meet
  googleMeetData: GoogleMeetData;
  
  // Datos médicos básicos
  motivoConsulta: string;
  notasPreliminares?: string;
  notasFinales?: string;
  recetaPrescrita?: string;
  proximaCita?: Date;
  
  // Metadatos
  fechaCreacion: Date;
  fechaActualizacion: Date;
  version: number;
}

export interface GoogleMeetData {
  meetingId: string;
  meetingUrl: string;
  calendarEventId: string;
  embedUrl?: string;
  entryPoints?: EntryPoint[];
  conferenceId?: string;
}

export interface EntryPoint {
  entryPointType: 'video' | 'phone' | 'sip' | 'more';
  uri: string;
  label?: string;
  pin?: string;
  accessCode?: string;
}

export type EstadoConsulta = 
  | 'programada' 
  | 'en_espera' 
  | 'en_curso' 
  | 'finalizada' 
  | 'cancelada' 
  | 'no_asistio';

export type TipoConsulta = 
  | 'primera_vez' 
  | 'seguimiento' 
  | 'emergencia' 
  | 'segunda_opinion';

export interface ConfiguracionConsulta {
  permitirGrabacion: boolean;
  requiereReceta: boolean;
  duracionExtendida: boolean;
  requiereEspecialista: boolean;
}