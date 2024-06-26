import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { Interceptor } from './http.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
};
