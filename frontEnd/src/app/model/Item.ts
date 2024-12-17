export class Item {

	private totalAmount: number;
	private quantity: number;
	private sku: string;
	private name: string;
	private category: string;
	public animate: boolean;

	public getTotalAmount(): number {
		return this.totalAmount;
	}

	public setTotalAmount(totalAmount: number): void {
		this.totalAmount = totalAmount;
	}

	public getQuantity(): number {
		return this.quantity;
	}

	public setQuantity(quantity: number): void {
		this.quantity = quantity;
	}

	public getSku(): string {
		return this.sku;
	}

	public setSku(sku: string): void {
		this.sku = sku;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): void {
		this.name = name;
	}

	public getCategory(): string {
		return this.category;
	}

	public setCategory(category: string): void {
		this.category = category;
	}


	constructor() {
		this.totalAmount = 0;
		this.quantity = 0;
		this.sku = "999";
		this.name = "p1";
		this.category = "c1";
		this.animate = false;
	};

	public create(): any {
	};

}