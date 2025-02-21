import { HttpClient } from "@angular/common/http";
import { Product } from "./Product";
import { Order } from "./Order";
import { AppSettings } from './AppSettings';
import { map, tap, Observable } from 'rxjs';
import { inject, Injectable, runInInjectionContext } from "@angular/core";

@Injectable()
export class Orders {

	private items: Array<any> = [];
	private http: HttpClient;

	constructor() {
		this.http = inject(HttpClient);
		this.reload();
	};

	public getOrders(): Array<Order> {
		return this.items.reverse();
	};

	public reload(): any {

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


}