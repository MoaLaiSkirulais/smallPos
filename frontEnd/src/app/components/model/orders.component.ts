import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from '../../model/Order';
import { BackendService } from '../../BackendService';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { AppSettings } from '../../model/AppSettings';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OrdersManager } from '../../model/OrdersManager';
import { MomentModule } from 'ngx-moment';
import { MutableLiveData } from '@martinporto/mutable-live-data';

@Component({

	selector: 'app-orders',
	standalone: true,
	imports: [MatSlideToggleModule, MatCardModule, CurrencyPipe, MatTableModule, MomentModule, MatCardModule],
	templateUrl: '../layout/orders.component.html',
	styleUrl: '../style/orders.component.css'
})

export class OrdersComponent {

	dataSource: MatTableDataSource<Order>;
	orders: MutableLiveData<Order>;
	displayedColumns: string[] = ['date', 'totalAmount', 'totalItems'];
	@ViewChild(MatTable) table: MatTable<Order>;
	public backendService: BackendService

	constructor(private http: HttpClient, private paramBackendService: BackendService) {

		this.backendService = paramBackendService;
		this.orders = new MutableLiveData(Order);
		this.dataSource = new MatTableDataSource<Order>();

		this.backendService.getOrders().observe((order) => {

			this.dataSource.data = []
			order.getOrders().forEach((item: Order) => {
				this.dataSource.data.push(item);
			});
			this.table.renderRows();
		});

	};
}