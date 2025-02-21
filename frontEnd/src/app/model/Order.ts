import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Item } from "./Item";
import { AppSettings } from './AppSettings';
import { map, Observable } from 'rxjs';
import { inject, Injectable } from "@angular/core";
import { Injector } from "@angular/core";

@Injectable()
export class Order {

	private totalAmount: number;
	private totalItems: number;
	private state: string;
	private creationDate: Date;
	private items: Array<Item> = [];
	private http: HttpClient;

	public getItems(): Array<Item> {
		return this.items;
	};

	constructor() {

		this.http = inject(HttpClient);
		this.create();
	};

	public getTotalAmount(): number {
		return this.totalAmount;
	};

	public getTotalItems(): number {
		return this.totalItems;
	};

	public getCreationDate(): Date {
		return this.creationDate;
	};	

	public create(): Observable<any> {

		return this.http.post(AppSettings.API_ENDPOINT + '/order', null)
			.pipe(map((order: any) => { this.build(order) }));
	};

	public addItem(sku: number): Observable<any> {

		return this.http.post(AppSettings.API_ENDPOINT + '/order/items', { sku: sku })
			.pipe(map((order: any) => { this.build(order) }));
	};

	public deleteItem(sku: number): Observable<any> {

		const options = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
			body: { sku: sku }
		};

		return this.http.delete(AppSettings.API_ENDPOINT + '/order/items', options)
			.pipe(map((order: any) => { this.build(order) }));
	};

	public pay(): Observable<any> {

		return this.http.get(AppSettings.API_ENDPOINT + '/order/close')
			.pipe(map((order: any) => { this.build(order) }));
	};

	private build(order: any) {

		this.totalAmount = order.totalAmount;
		this.totalItems = order.totalItems;
		this.state = order.state;
		this.creationDate = order.date;

		this.items = [];
		order.items.forEach((item: any) => {
			var item1 = new Item();
			item1.setCategory(item.category);
			item1.setName(item.name);
			item1.setQuantity(item.quantity);
			item1.setSku(item.sku);
			item1.setTotalAmount(item.totalAmount);
			this.items.push(item1);
		})

	}
}