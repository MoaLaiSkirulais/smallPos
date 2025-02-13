import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from '../../model/Order';
import { DataService } from '../../DataService';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { AppSettings } from '../../model/AppSettings';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Orders } from '../../model/Orders';
import { MomentModule } from 'ngx-moment';
import { MutableLiveData } from '@martinporto/mutable-live-data';

@Component({
	
	selector: 'app-orders',
	standalone: true,
	imports: [MatSlideToggleModule, MatCardModule, CurrencyPipe, MatTableModule, MomentModule],
	templateUrl: '../layout/orders.component.html',
	styleUrl: '../style/orders.component.css'
}) 

export class OrdersComponent {

	dataSource: MatTableDataSource<Order>;
	orders: MutableLiveData<Order>;
	displayedColumns: string[] = ['date', 'totalAmount', 'totalItems'];
	@ViewChild(MatTable) table: MatTable<Order>;
	public dataService: DataService

	constructor(private http: HttpClient, private ds: DataService) {

		this.dataService = ds;
		this.orders = new MutableLiveData(Order);
		this.dataSource = new MatTableDataSource<Order>();

		this.dataService.getOrders().observe((order) => {

			console.log("order", order)
			this.dataSource.data = []

			console.log("getOrders observe", order)			
			order.getItems().forEach((item: Order) => {
				this.dataSource.data.push(item);
			});
			this.table.renderRows();
		});	

	};

	// public do(){
	// 	this.dataService.getOrders().getValue().refresh().subscribe(
	// 		(e)=>{console.log(e)

	// 			this.dataService.getOrders().postValue(this.dataService.getOrders().getValue());
	// 		});
	// }


}