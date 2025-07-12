import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private ensureStorageReady() {
    if (!this._storage) {
      throw new Error('Storage not initialized');
    }
  }

  // Métodos básicos de almacenamiento
  async set(key: string, value: any): Promise<any> {
    this.ensureStorageReady();
    return this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    this.ensureStorageReady();
    return this._storage?.get(key);
  }

  async remove(key: string): Promise<any> {
    this.ensureStorageReady();
    return this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    this.ensureStorageReady();
    return this._storage?.clear();
  }

  async keys(): Promise<string[]> {
    this.ensureStorageReady();
    return this._storage?.keys() || [];
  }

  async length(): Promise<number> {
    this.ensureStorageReady();
    return this._storage?.length() || 0;
  }

  // Métodos específicos para datos médicos
  async saveUserData(userData: any): Promise<void> {
    await this.set('medical_user_data', userData);
  }

  async getUserData(): Promise<any> {
    return await this.get('medical_user_data');
  }

  async saveGoogleTokens(tokens: any): Promise<void> {
    await this.set('google_tokens', tokens);
  }

  async getGoogleTokens(): Promise<any> {
    return await this.get('google_tokens');
  }

  async saveMeetingHistory(meetings: any[]): Promise<void> {
    await this.set('meeting_history', meetings);
  }

  async getMeetingHistory(): Promise<any[]> {
    return await this.get('meeting_history') || [];
  }

  async saveLastLogin(timestamp: string): Promise<void> {
    await this.set('last_login', timestamp);
  }

  async getLastLogin(): Promise<string | null> {
    return await this.get('last_login');
  }

  // Método para limpiar datos sensibles
  async clearSensitiveData(): Promise<void> {
    await this.remove('google_tokens');
    await this.remove('medical_user_data');
  }

  // Verificar si el usuario está configurado
  async isUserConfigured(): Promise<boolean> {
    const userData = await this.getUserData();
    return userData && userData.id;
  }
}