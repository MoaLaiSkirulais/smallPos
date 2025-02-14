import { Component, ViewChild, ChangeDetectorRef, LOCALE_ID } from '@angular/core';
import { Catalog } from '../../model/Catalog';
import { HttpClient } from "@angular/common/http";
import { Product } from '../../model/Product';
import { BackendService } from '../../BackendService';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { CurrencyPipe } from '@angular/common';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import { A } from '@angular/cdk/keycodes';
import {MatCardModule} from '@angular/material/card';


@Component({
	selector: 'app-catalog',
	standalone: true,
	imports: [MatGridListModule, MatTableModule,  MatIconModule, CurrencyPipe, MatSortModule, MatCardModule],
	templateUrl: '../layout/catalog.component.html',
	styleUrl: '../style/catalog.component.css'
})

export class CatalogComponent {

	catalog: Catalog;
	displayedColumns: string[] = ['name', 'price', 'add'];
	@ViewChild(MatTable) table: MatTable<Product>;
	@ViewChild(MatSort) sort: MatSort;
	public dataService: BackendService

	constructor(private http: HttpClient, public dataService1: BackendService, private changeDetectorRefs: ChangeDetectorRef) {
		this.dataService = dataService1;
	}

	public addItem(sku: number): any {
		this.dataService.getOrder().getValue().addItem(sku)
			.subscribe(e => {
				this.dataService.getOrder().postValue(this.dataService.getOrder().getValue());
			});
	}

	public clickHandler(product: Product): any {
		this.addItem(product.getSku())
	}
}


