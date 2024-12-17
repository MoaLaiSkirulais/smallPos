import { Component,OnInit  } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from '../../model/Order';
import { DataService } from '../../DataService';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';


@Component({
	selector: 'app-order',
	standalone: true,
	imports: [MatSlideToggleModule, MatButton, MatCardModule, CurrencyPipe, MatIconModule],
	templateUrl: './order.component.html',
	styleUrl: './order.component.css'
})

export class OrderComponent implements OnInit {

	public order: Order;
	myOrder$: Observable<Order>;
	dataService: DataService;

	constructor(private http: HttpClient, private ds: DataService) {

		this.dataService = ds;
		this.dataService.getOrder().observe((order)=>{
			this.order = order;
		})
	};

	ngOnInit() {
		this.dataService.getOrder().observe((order)=>{
			this.order = order;
		})
	}

	public getOrder(): Order {
		return this.dataService.getOrder().getValue();
	}

	public createOrder(): any {

		this.dataService.getOrder().getValue().create()
			.subscribe(e => {
				this.dataService.getOrder().postValue(this.dataService.getOrder().getValue());
			});
	}

	public payOrder(): any {

		this.dataService.getOrder().getValue().pay()
		.subscribe(e => {
			this.createOrder();
			this.dataService.getOrder().postValue(this.dataService.getOrder().getValue());
			this.dataService.getOrders().getValue().refresh();
		});

	}

}