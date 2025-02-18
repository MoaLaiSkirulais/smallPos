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

export class Stats {

	private sales: Array<Total> = [];

	constructor(private http: HttpClient) {
	};

	public getSales(): Array<Total> {
		return this.sales;
	};	

	public loadSales(): any {

		this.http.get(AppSettings.API_ENDPOINT + '/orders/totals').subscribe((data: any) => {
			this.sales = [];
			data.forEach((total: any) => {
				this.sales.push(new Total(total.date, total.total));
			});
		});
	}
}