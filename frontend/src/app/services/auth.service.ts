import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  authStatus$ = this.authStatus.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);  
    this.authStatus.next(true);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
   
  }

  getToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}