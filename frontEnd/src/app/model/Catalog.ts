import { HttpClient } from "@angular/common/http";
import { Product } from "./Product";
import { AppSettings } from './AppSettings';

export class Catalog {

	private products: Array<Product> = [];

	constructor(private http: HttpClient) {
		this.create();
	};

	public getProducts(): Array<Product> {
		return this.products;
	};

	public create(): any {

		this.http.get(AppSettings.API_ENDPOINT + '/products').subscribe((data: any) => {
			this.build(data);
		});
	}

	private build(data: any) {

		this.products = [];
		data.forEach((productData: any) => {

			var newProduct = new Product(
				productData.name,
				productData.description,
				productData.price,
				productData.sku,
				productData.name
			);

			this.products.push(newProduct);
		})
	}
}