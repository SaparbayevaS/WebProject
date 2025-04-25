import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { AuthInterceptor } from './app/interceptors/auth.interceptor'; // путь правильный!

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(AppRoutingModule)
  ],
});