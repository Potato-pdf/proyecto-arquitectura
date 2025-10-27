import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiExternaService {
  private readonly apiUrl = 'http://localhost:4000/usuarios';

  /**
   * Método para obtener usuarios de la API externa
   */
  async GetUsuarios(): Promise<any[]> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios de API externa:', error);
      return [];
    }
  }

  /**
   * Método para insertar un usuario en la API externa
   */
  async InsertUsuario(data: { name: string; mail: string; password: string }): Promise<void> {
    try {
      await axios.post(this.apiUrl, data);
      console.log('Usuario insertado en API externa');
    } catch (error) {
      console.error('Error al insertar usuario en API externa:', error);
      // No lanzamos error para no fallar el registro local
    }
  }
}