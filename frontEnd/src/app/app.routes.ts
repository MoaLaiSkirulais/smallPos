import { Routes } from '@angular/router';
import { AppComponent } from './components/model/app.component';
import { SalesComponent } from './components/model/sales.component';

export const routes: Routes = [

	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	
	{
		
		path: 'home', component: AppComponent,
		children: [
			{ path: '', redirectTo: 'sales', pathMatch: 'full' },
			{ path: 'sales', component: SalesComponent }
		]
	}

];
