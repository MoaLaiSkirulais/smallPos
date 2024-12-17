import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from './model/Order';
import { Catalog } from './model/Catalog';
import { Company } from "./model/Company";
import { Orders } from './model/Orders';
import { Totals } from './model/Totals';
import { MutableLiveData } from '@martinporto/mutable-live-data';

@Injectable({
	providedIn: 'root'
})

export class DataService {

	private order: MutableLiveData<Order>;
	private catalog: Catalog;
	private company: Company;
	private orders: MutableLiveData<Orders>;
	private totals: Totals;

	constructor(private http: HttpClient) {

		this.order = new MutableLiveData(Order);
		this.order.postValue(new Order());

		this.catalog = new Catalog(this.http);
		this.company = new Company(this.http);
		this.orders = new MutableLiveData(Orders);
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
	
	public getOrders(): MutableLiveData<Orders> {
		return this.orders;
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

}