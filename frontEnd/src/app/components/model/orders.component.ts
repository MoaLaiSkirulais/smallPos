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
import { Orders } from '../../model/Orders';
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

	displayedColumns: string[] = ['date', 'totalAmount', 'totalItems'];
	public backendService: BackendService

	constructor(private http: HttpClient, private paramBackendService: BackendService) {
		this.backendService = paramBackendService;
		this.backendService.loadOrders();
	};
}