import { Component } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { OrderComponent } from './order.component';
import { ItemsComponent } from './items.component';
import { OrdersComponent } from './orders.component';
import { TotalsComponent } from './totals.component';

@Component({
	selector: 'app-sales',
	standalone: true,
	imports: [CatalogComponent, OrderComponent, ItemsComponent, OrdersComponent, TotalsComponent],
	templateUrl: '../layout/sales.component.html',
	styleUrl: '../style/sales.component.css'
})

export class SalesComponent {

	constructor() { };
}
