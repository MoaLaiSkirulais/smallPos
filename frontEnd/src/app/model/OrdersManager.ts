import { HttpClient } from "@angular/common/http";
import { Product } from "./Product";
import { Order } from "./Order";
import { AppSettings } from './AppSettings';
import { map, tap, Observable } from 'rxjs';
import { inject, Injectable, runInInjectionContext } from "@angular/core";

@Injectable()
export class OrdersManager {

	private items: Array<any> = [];
	private http: HttpClient;

	constructor() {
		this.http = inject(HttpClient);
		this.reload();
	};

	public getOrders(): Array<Order> {
		return this.items.reverse();
	};

	@Injectable()
	public reload(): any {

		console.log("------------refresh-----")
		return this.http.get(AppSettings.API_ENDPOINT + '/orders')
			.pipe(
				map((orders: any) => {
					this.items = [];
					orders.forEach((order1: any) => {
						this.items.push(order1)
					});
				})
			)
	}

	public getTotal(): any {

		this.http.get(AppSettings.API_ENDPOINT + '/orders/totals').subscribe((data: any) => {
			console.log(data);
		});
	}

}