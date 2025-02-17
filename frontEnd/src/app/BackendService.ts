import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from './model/Order';
import { Catalog } from './model/Catalog';
import { Company } from "./model/Company";
import { OrdersManager } from './model/OrdersManager';
import { Totals } from './model/Totals';
import { MutableLiveData } from '@martinporto/mutable-live-data';

@Injectable({
	providedIn: 'root'
})

export class BackendService {

	private order: MutableLiveData<Order>;
	private catalog: Catalog;
	private company: Company;
	private orders: MutableLiveData<OrdersManager>;
	private totals: Totals;

	constructor(private http: HttpClient) {

		this.order = new MutableLiveData(Order);
		this.order.postValue(new Order());

		this.catalog = new Catalog(this.http);
		this.company = new Company(this.http);
		this.orders = new MutableLiveData(OrdersManager);
		this.totals = new Totals(this.http);
		this.order.create();
	}

	public addItem(sku: number) {
		//this.order.addItem(sku);
		//this.order.ob.subscribe(x => console.log("ob", x));
	}

	public reloadCatalog() {
		this.catalog.create()
	}

	public getOrder(): MutableLiveData<Order> {
		return this.order;
	}

	// public getOrder2(): Order {
	// 	return this.order;
	// }

	public getOrders(): MutableLiveData<OrdersManager> {
		return this.orders;
	}

	public reloadOrders(): any {
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

	public getTotals(): Totals {
		return this.totals;
	}

	public payOrder(): any {

		return this.order.getValue().pay()
			.subscribe(e => {
				this.order.postValue(this.order.getValue());
				this.reloadOrders();
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