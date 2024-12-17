export class Product {

	private name: string;
	private description: string;
	private price: number;
	private sku: number;
	private category: string;

	constructor(
		name: string,
		description: string,
		price: number,
		sku: number,
		category: string
	) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.sku = sku;
		this.category = category;
	};

	public getName(): string {
		return this.name;
	};

	public getDescription(): string {
		return this.description;
	};

	public getPrice(): number {
		return this.price;
	};

	public getSku(): number {
		return this.sku;
	};

	public getCategory(): string {
		return this.category;
	};
}