import { Component, ViewChild, OnInit } from '@angular/core';
import { Item } from '../../model/Item';
import { Order } from '../../model/Order';
import { DataService } from '../../DataService';
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
	templateUrl: './items.component.html',
	styleUrl: './items.component.css',
})

export class ItemsComponent implements OnInit{

	dataSource: MatTableDataSource<Item>;
	order: MutableLiveData<Order>;
	displayedColumns: string[] = ['quantity', 'name', 'totalAmount', 'remove'];
	@ViewChild(MatTable) table: MatTable<Item>;
	public dataService: DataService;

	constructor(private ds: DataService) {

		this.dataService = ds;
		this.order = new MutableLiveData(Order);
		this.dataSource = new MatTableDataSource<Item>();
	};

	ngOnInit() {

		this.dataService.getOrder().observe((order) => {

			console.log("getOrder observe", order)

			if (order.getItems().length == 0){
				this.dataSource.data = [];
			}

			order.getItems().forEach((item: Item) => {
				this.addRow(item);
			});
			
			this.dataSource.data.forEach((item: Item) => {
				this.removeRow(item, order);
			});

			this.table.renderRows();
		});	
	}

	private addRow(item: Item): any {

		var b = this.dataSource.data.findIndex((i) => i.getSku() == item.getSku());
		console.log("b", b)
		if (b == -1){
			this.dataSource.data.push(item);
		} else {
			this.dataSource.data[b].setQuantity(item.getQuantity());
			this.dataSource.data[b].setTotalAmount(item.getTotalAmount());
		}
	}

	private removeRow(item: Item, order:Order): any {

		var b = order.getItems().findIndex((i) => i.getSku() == item.getSku());
		console.log("b", b)
		if (b == -1){
			//this.dataSource.data.shift(item);
		
		}
	}

	
	public deleteItem(sku:number): any {
		
		this.dataService.getOrder().getValue().deleteItem(sku)
			.subscribe(e => {
				this.dataService.getOrder().postValue(this.dataService.getOrder().getValue());
			});

			
	}
}