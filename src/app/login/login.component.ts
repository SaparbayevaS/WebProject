import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.http.post('http://localhost:8000/api/login/', {
      username: this.loginData.username,
      password: this.loginData.password
    }).subscribe({
      next: (response: any) => {
      
        localStorage.setItem('authToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        localStorage.setItem('username', this.loginData.username);
        this.authService.login(this.loginData.username, response.access);

        this.router.navigate(['profile']);
      },
      error: (error) => {
        alert('ОLogin error. Please check if your data is correct.');
        console.error('Login error:', error);
      }
    });
  }
}