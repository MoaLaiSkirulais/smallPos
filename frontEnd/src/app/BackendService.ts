import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from './model/Order';
import { Catalog } from './model/Catalog';
import { Company } from "./model/Company";
import { OrdersManager } from './model/OrdersManager';
import { Stats } from './model/Stats';
import { MutableLiveData } from '@martinporto/mutable-live-data';

@Injectable({
	providedIn: 'root'
})

export class BackendService {

	private order: MutableLiveData<Order>;
	private catalog: Catalog;
	private company: Company;
	private orders: MutableLiveData<OrdersManager>;
	private stats: Stats;

	constructor(private http: HttpClient) {

		this.order = new MutableLiveData(Order);
		this.catalog = new Catalog(this.http);
		this.company = new Company(this.http);
		this.orders = new MutableLiveData(OrdersManager);
		this.stats = new Stats(this.http);
		this.order.create();
	}

	public reloadCatalog() {
		this.catalog.create()
	}

	public getOrder(): MutableLiveData<Order> {
		return this.order;
	}

	public addItem(sku: number): any {

		var order: Order = this.order.getValue();
		order.addItem(sku).subscribe(e => { this.order.postValue(order) });
	}

	public getOrders(): MutableLiveData<OrdersManager> {
		return this.orders;
	}

	public loadOrders(): any {
		this.orders.getValue().reload().subscribe(() => {
			this.orders.postValue(this.orders.getValue());
		});
	}

	public getCatalog(): Catalog {
		return this.catalog;
	}

	public getCompany(): Company {
		return this.company;
	}

	public getSales(): any {
		return this.stats.getSales();
	}
	
	public loadSales(): any {
		this.stats.loadSales();
	}

	public payOrder(): any {

		return this.order.getValue().pay()
			.subscribe(() => {
				this.order.postValue(this.order.getValue());
				this.loadOrders();
				this.loadSales();
				this.createOrder();
			});
	}

	public createOrder(): any {

		var order: Order = this.order.getValue();
		order.create().subscribe(e => { this.order.postValue(order) });
	}

	// public getOrder(): any {
	// 	this.order.getValue();
	// }

	public deleteItem(sku: number): any {

		var order: Order = this.order.getValue();
		order.deleteItem(sku).subscribe(e => { this.order.postValue(order) });
	}

}