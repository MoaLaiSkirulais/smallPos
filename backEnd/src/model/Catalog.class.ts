import Product from "./Product.class";


class Catalog {
 
	private products: Array<Product> = [];    

	constructor() {

		var fs = require('fs');
		//var aux = JSON.parse(fs.readFileSync('./src/data/catalogs/coffee.catalog.json', 'utf8')); 
		//var aux = JSON.parse(fs.readFileSync('./src/data/boutique.catalog.json', 'utf8')); 
		var aux = JSON.parse(fs.readFileSync('./src/data/catalogs/minimarket.catalog.json', 'utf8')); 
		aux.categories.forEach((category: any) => {
			category.items.forEach((product: any) => {

				var newProduct = new Product(
					product.name,
					product.description,
					product.price,
					product.sku,
					category.name
				);

				this.products.push(newProduct);
			})
		})
	};

	public getProducts() {
		return this.products;
	}

	public find(sku: string): Product {

		var p = new Product();
		this.products.forEach((product: Product) => {			
			if (product.getSku() == sku) {
				p = product;				
			}
		});

		return p;		
	}
}

export = Catalog;
