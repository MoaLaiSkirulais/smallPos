import Orders from "./Orders.class";

let instance: App;

class App {

	public name: String = "Hello";
	public counter: number = 0;
	public orders: Orders = new Orders();
	private static ourInstance: App = new App();

	public static get(): App {
		return this.ourInstance;
	};

	constructor() {
	};

	public add() {
		this.counter++;
	};
}

export = App;
