class Product {

	private name: string; 
	private description: string;
	private price: number;
	private sku: string;
	private category: string;

	constructor(name: string, description: string, price: number, sku: string, category: string);

	constructor();

	constructor(...myarray: any[]) {

		if (myarray.length === 5) {
			this.name = myarray[0];
			this.description = myarray[1];
			this.price = myarray[2];
			this.sku = myarray[3]; 
			this.category = myarray[4];
			return;
		}

		this.name = "";
		this.description = "";
		this.price = 0;
		this.sku = "";
		this.category = ""
	}

	public getName(): string {
		return this.name;
	};

	public getDescription(): string {
		return this.description;
	};

	public getPrice(): number {
		return this.price;
	};

	public getSku(): string {
		return this.sku;
	};

	public getCategory(): string {
		return this.category;
	};

	Product() { };
}

export = Product;
