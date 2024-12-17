import { Component } from '@angular/core';
import { OrdersComponent } from '../model/orders.component';
import { TotalsComponent } from './totals.component';

@Component({
	selector: 'app-summary',
	standalone: true,
	imports: [OrdersComponent, TotalsComponent],
	templateUrl: '../layout/summary.component.html',
	styleUrl: '../style/summary.component.css'
})

export class SummaryComponent {

	constructor() { };
}
