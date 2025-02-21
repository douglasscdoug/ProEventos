import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { SharedModule } from './app/shared.module'

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(SharedModule),
    provideAnimations()
  ]
}).catch(err => console.error(err));