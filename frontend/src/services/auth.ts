import api from './api';
import type { LoginCredentials, RegisterCredentials, User } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setAuthData(user: User, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  },
};