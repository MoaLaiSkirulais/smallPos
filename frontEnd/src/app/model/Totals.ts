import { HttpClient } from "@angular/common/http";
import { Product } from "./Product";
import { Order } from "./Order";
import { AppSettings } from './AppSettings';

export class Total {

	private date: string;
	private total: number;

	public getDate(): string {
		return this.date;
	}

	public getTotal(): number {
		return this.total;
	}

	constructor(date: string, total: number) {
		this.date = date;
		this.total = total;
	};
}

export class Totals {

	private items: Array<Total> = [];

	constructor(private http: HttpClient) {
		this.getTotal();
	};

	public getItems(): Array<Total> {
		return this.items;
	};	

	public getTotal(): any {

		this.http.get(AppSettings.API_ENDPOINT + '/orders/totals').subscribe((data: any) => {
			this.items = [];
			data.forEach((total: any) => {
				this.items.push(new Total(total.date, total.total));
			});

		});
	}

}