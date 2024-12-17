import Catalog from "./Catalog.class";
import Product from "./Product.class";
import Item from "./Item.class";
import Afip = require('./Afip.class');
import Company = require("./Company.class");
import TmPrinter = require("./TmPrinter.class");
import Network from "@node-escpos/network-adapter";
import Order = require("./Order.class");
import AppDatabase = require('../model/AppDatabase.class');

class Orders {

	private orders: Array<Order> = [];

	constructor() { 
		this.init();
	};

	public add(order: Order) {
		this.orders.push(order);
	};

	public get(): Array<Order> {
		return this.orders;
	};
	
	public async init() {
		var database = new AppDatabase();
		var orders =  await database.getOrders();
		// orders.forEach((row: any) => {
		// 	//t.push({ "date": row.range, "total": row.total });
		// });
		return(orders);
	};

}

export = Orders;
