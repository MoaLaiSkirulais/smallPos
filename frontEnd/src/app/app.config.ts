import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from "./components/model/app.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ItemsComponent } from './components/model/items.component';
import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		//provideRouter(AppRoutingModule),
		//provideRouter(routes, withHashLocation()),
		provideRouter(routes),
		provideHttpClient(),
		provideAnimationsAsync(),
		provideAnimationsAsync(),
		{ provide: LocationStrategy, useClass: HashLocationStrategy }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
	]

};
