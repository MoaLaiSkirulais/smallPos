import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from "./components/app/app.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ItemsComponent } from './components/items/items.component';
import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		//provideRouter(AppRoutingModule),
		//provideRouter(routes, withHashLocation()),
		provideRouter(routes),
		provideHttpClient(),
		provideAnimationsAsync(),
		provideAnimationsAsync(),
		{ provide: LocationStrategy, useClass: HashLocationStrategy }
	]

};
