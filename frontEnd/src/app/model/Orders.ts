import { HttpClient } from "@angular/common/http";
import { Product } from "./Product";
import { Order } from "./Order";
import { AppSettings } from './AppSettings';
import { map, tap, Observable } from 'rxjs';
import { inject, Injectable,runInInjectionContext } from "@angular/core";

@Injectable()
export class Orders {

	private items: Array<any> = [];
	private http: HttpClient;

	constructor() {
		this.http = inject(HttpClient);
		this.refresh();
	};

	public getItems(): Array<Order> {
		return this.items.reverse();
	};

	@Injectable()
	public refresh(): any {

		console.log("------------refresh-----")

		// return this.http.post(AppSettings.API_ENDPOINT + '/order/items', { sku: sku })
		// .pipe(map((order: any) => { this.build(order) }));

		return this.http.get(AppSettings.API_ENDPOINT + '/orders')
			.pipe(

				map((orders: any) => {
					
					this.items = [];
					orders.forEach((order1: any) => {

						console.log("order1", order1)
						// var o: Order = new Order();
						// o.setCreationDate(order1.creationDate);
						// o.setTotalAmount(order1.totalAmount);
						// o.setTotalItems(order1.totalItems);
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