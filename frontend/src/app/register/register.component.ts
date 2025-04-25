import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    name: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:8000/api/register/', {
      username: this.registerData.name,
      password: this.registerData.password
    }).subscribe({
      next: (response) => {
        alert('The user has been successfully registered!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Registration error. Please try again.');
        console.error('Registration error:', error);
      }
    });
  }
}
