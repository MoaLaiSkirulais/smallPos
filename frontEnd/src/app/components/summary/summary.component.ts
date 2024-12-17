import { Component } from '@angular/core';
import { OrdersComponent } from '../orders/orders.component';
import { TotalsComponent } from '../totals/totals.component';

@Component({
	selector: 'app-summary',
	standalone: true,
	imports: [OrdersComponent, TotalsComponent],
	templateUrl: './summary.component.html',
	styleUrl: './summary.component.css'
})

export class SummaryComponent {

	constructor() { };
}
