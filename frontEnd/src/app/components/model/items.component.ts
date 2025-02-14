import { Component, ViewChild, OnInit } from '@angular/core';
import { Item } from '../../model/Item';
import { Order } from '../../model/Order';
import { BackendService } from '../../BackendService';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { rowsAnimation } from "../animations/rowsAnimation.component";
import { fadeOut, blub } from "../animations/rowsAnimation2.component";
import { MutableLiveData } from '@martinporto/mutable-live-data';

@Component({
	selector: 'app-items',
	standalone: true,
	imports: [MatGridListModule, MatTableModule,  MatIconModule, CurrencyPipe],
	animations: [rowsAnimation, fadeOut, blub ],
	templateUrl: '../layout/items.component.html',
	styleUrl: '../style/items.component.css',
})

export class ItemsComponent implements OnInit{

	dataSource: Array<Item>;
	displayedColumns: string[] = ['quantity', 'name', 'totalAmount', 'remove'];
	public backendService: BackendService;

	constructor(private paramBackendService: BackendService) {

		this.backendService = paramBackendService;
		this.dataSource = new Array<Item>();
	};

	ngOnInit() {

		this.backendService.getOrder().observe((order:Order) => {
			this.dataSource = [];			
			order.getItems().forEach((item: Item) => {
				this.dataSource.push(item);
			});
		});	
	}

	public deleteItem(sku:number): any {		
		this.backendService.deleteItem(sku);
	}
}