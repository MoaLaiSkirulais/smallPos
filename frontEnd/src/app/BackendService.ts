import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from './model/Order';
import { Catalog } from './model/Catalog';
import { Company } from "./model/Company";
import { Orders } from './model/Orders';
import { Stats } from './model/Stats';
import { MutableLiveData } from '@martinporto/mutable-live-data';

@Injectable({
	providedIn: 'root'
})

export class BackendService {

	private order: Order;
	private catalog: Catalog;
	private company: Company;
	private orders: Orders;
	private stats: Stats;

	constructor(private http: HttpClient) {

		this.order = new Order();
		this.catalog = new Catalog(this.http);
		this.company = new Company(this.http);
		this.orders = new Orders();
		this.stats = new Stats(this.http);
		this.order.create();
	}

	public reloadCatalog() {
		this.catalog.create()
	}

	public getOrder(): Order {
		return this.order;
	}

	public addItem(sku: number): any {

		var order: Order = this.order;
		order.addItem(sku).subscribe(e => { });
	}

	public getOrders(): Array<Order> {
		return this.orders.getOrders();
	}

	public loadOrders(): any {
		this.orders.reload().subscribe(() => { });
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

		return this.order.pay()
			.subscribe(() => {
				this.loadOrders();
				this.loadSales();
				this.createOrder();
			});
	}

	public createOrder(): any {

		var order: Order = this.order;
		order.create().subscribe(e => { });
	}

	public deleteItem(sku: number): any {

		var order: Order = this.order;
		order.deleteItem(sku).subscribe(e => { });
	}

}