import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { environment } from '../../../environments/environment';

// Import específico para @codetrix-studio/capacitor-google-auth
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

declare const gapi: any;

export interface MeetingData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  attendees: { email: string }[];
  meetingType: 'consultation' | 'follow-up' | 'emergency';
}

export interface MeetingResponse {
  id: string;
  summary?: string;
  description?: string;
  htmlLink: string;
  hangoutLink: string;
  start: { dateTime: string };
  end: { dateTime: string };
  attendees?: { email: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleMeetMVPService {
  private isGapiLoaded = false;
  private isSignedIn = false;
  private accessToken: string | null = null;
  private currentUser: any = null;

  constructor(private platform: Platform) {
    this.initializeGoogleAuth();
  }

  private async initializeGoogleAuth(): Promise<void> {
    try {
      if (this.platform.is('capacitor')) {
        // Configuración para apps nativas
        await GoogleAuth.initialize({
          clientId: this.platform.is('ios') 
            ? environment.googleMeet.iosClientId 
            : environment.googleMeet.androidClientId,
          scopes: environment.googleMeet.scope,
          grantOfflineAccess: true
        });
      } else {
        // Configuración para web
        await this.loadGapi();
      }
    } catch (error) {
      console.error('Error initializing Google Auth:', error);
      // Fallback a web si falla nativo
      if (this.platform.is('capacitor')) {
        await this.loadGapi();
      }
    }
  }

  private async loadGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof gapi !== 'undefined') {
        gapi.load('auth2:client', {
          callback: () => {
            this.initializeGapi().then(resolve).catch(reject);
          },
          onerror: reject
        });
      } else {
        // Cargar GAPI dinámicamente
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          gapi.load('auth2:client', {
            callback: () => {
              this.initializeGapi().then(resolve).catch(reject);
            },
            onerror: reject
          });
        };
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  }

  private async initializeGapi(): Promise<void> {
    await gapi.client.init({
      apiKey: environment.googleMeet.apiKey,
      clientId: environment.googleMeet.webClientId,
      discoveryDocs: environment.googleMeet.discoveryDocs,
      scope: environment.googleMeet.scope.join(' ')
    });

    this.isGapiLoaded = true;
    const authInstance = gapi.auth2.getAuthInstance();
    this.isSignedIn = authInstance.isSignedIn.get();
    
    if (this.isSignedIn) {
      this.currentUser = authInstance.currentUser.get();
      this.accessToken = this.currentUser.getAuthResponse().access_token;
    }
  }

  async signIn(): Promise<any> {
    try {
      if (this.platform.is('capacitor')) {
        // Autenticación nativa
        const result = await GoogleAuth.signIn();
        this.isSignedIn = true;
        this.accessToken = result.authentication.accessToken;
        this.currentUser = result.user;
        return result;
      } else {
        // Autenticación web
        if (!this.isGapiLoaded) {
          await this.loadGapi();
        }
        const authInstance = gapi.auth2.getAuthInstance();
        const user = await authInstance.signIn();
        this.isSignedIn = true;
        this.currentUser = user;
        this.accessToken = user.getAuthResponse().access_token;
        return user;
      }
    } catch (error) {
      console.error('Error en signIn:', error);
      // Fallback a web si falla nativo
      if (this.platform.is('capacitor')) {
        console.log('Fallback a autenticación web...');
        return this.signInWeb();
      }
      throw error;
    }
  }

  private async signInWeb(): Promise<any> {
    if (!this.isGapiLoaded) {
      await this.loadGapi();
    }
    const authInstance = gapi.auth2.getAuthInstance();
    const user = await authInstance.signIn();
    this.isSignedIn = true;
    this.currentUser = user;
    this.accessToken = user.getAuthResponse().access_token;
    return user;
  }

  async signOut(): Promise<void> {
    try {
      if (this.platform.is('capacitor') && this.currentUser && !this.currentUser.getBasicProfile) {
        await GoogleAuth.signOut();
      } else if (this.isGapiLoaded) {
        const authInstance = gapi.auth2.getAuthInstance();
        await authInstance.signOut();
      }
      
      this.isSignedIn = false;
      this.accessToken = null;
      this.currentUser = null;
    } catch (error) {
      console.error('Error en signOut:', error);
      this.isSignedIn = false;
      this.accessToken = null;
      this.currentUser = null;
    }
  }

  async createMeeting(meetingData: MeetingData): Promise<MeetingResponse> {
    if (!this.isSignedIn || !this.accessToken) {
      throw new Error('Usuario no autenticado');
    }

    const event = {
      summary: meetingData.title,
      description: meetingData.description,
      start: {
        dateTime: meetingData.startTime,
        timeZone: 'America/Guayaquil'
      },
      end: {
        dateTime: meetingData.endTime,
        timeZone: 'America/Guayaquil'
      },
      attendees: meetingData.attendees,
      conferenceData: {
        createRequest: {
          requestId: this.generateRequestId(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    try {
      if (this.platform.is('capacitor')) {
        const response = await fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } else {
        const response = await gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
          conferenceDataVersion: 1
        });
        return response.result;
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw error;
    }
  }

  async joinMeeting(meetingLink: string): Promise<void> {
    if (!meetingLink) {
      throw new Error('Enlace de reunión no proporcionado');
    }

    try {
      if (this.platform.is('capacitor')) {
        await Browser.open({ 
          url: meetingLink,
          windowName: '_system',
          toolbarColor: '#1976d2'
        });
      } else {
        window.open(meetingLink, '_blank');
      }
    } catch (error) {
      console.error('Error joining meeting:', error);
      throw error;
    }
  }

  async listUpcomingMeetings(): Promise<MeetingResponse[]> {
    if (!this.isSignedIn || !this.accessToken) {
      throw new Error('Usuario no autenticado');
    }

    const timeMin = new Date().toISOString();
    
    try {
      if (this.platform.is('capacitor')) {
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&showDeleted=false&singleEvents=true&maxResults=10&orderBy=startTime`,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.items || [];
      } else {
        const response = await gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: timeMin,
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime'
        });
        return response.result.items || [];
      }
    } catch (error) {
      console.error('Error listing meetings:', error);
      throw error;
    }
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Getters
  isUserSignedIn(): boolean {
    return this.isSignedIn;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  getCurrentPlatform(): string {
    return this.platform.platforms().join(', ');
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}