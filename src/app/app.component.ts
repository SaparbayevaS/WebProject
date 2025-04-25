import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  username = '';
  selectedAction = '';
  private authSub!: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    window.addEventListener('storage', this.syncAuthData.bind(this));
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.authSub = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      this.username = localStorage.getItem('username') || '';
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  syncAuthData() {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    this.isAuthenticated = !!token && !!storedUsername;
    this.username = storedUsername || '';
  }

  onSubmit() {
    if (this.selectedAction === 'login') {
      this.router.navigate(['/login']);
    } else if (this.selectedAction === 'register') {
      this.router.navigate(['/register']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToMovies() {
    this.router.navigate(['/movies']);
  }
}
