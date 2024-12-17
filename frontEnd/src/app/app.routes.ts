import { Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SalesComponent } from './components/sales/sales.component';

export const routes: Routes = [

	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	
	{
		
		path: 'home', component: AppComponent,
		children: [
			{ path: '', redirectTo: 'sales', pathMatch: 'full' },
			{ path: 'sales', component: SalesComponent },
			{ path: 'summary', component: SummaryComponent },
		]
	}

];
