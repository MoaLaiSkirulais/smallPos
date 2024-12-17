import { Component } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { OrderComponent } from '../order/order.component';
import { ItemsComponent } from '../items/items.component';

@Component({
	selector: 'app-sales',
	standalone: true,
	imports: [CatalogComponent, OrderComponent, ItemsComponent],
	templateUrl: './sales.component.html',
	styleUrl: './sales.component.css'
})

export class SalesComponent  {
	
	constructor() {
	};
}
