import Catalog from "./Catalog.class";
import Product from "./Product.class";
import Item from "./Item.class";
import Afip = require('./Afip.class');
import Company = require("./Company.class");
import TmPrinter = require("./TmPrinter.class");
import Network from "@node-escpos/network-adapter";
import App = require("./App.class");
import AppDatabase = require('../model/AppDatabase.class');

class Order {

	private id: number;
	private totalAmount: number;
	private totalItems: number;
	private creationDate: Date;
	private cae: String;
	private items: Array<Item> = [];

	public getId(): number {
		return this.id;
	}

	public getTotalAmount(): number {
		return this.totalAmount;
	}

	public getTotalItems(): number {
		return this.totalItems;
	}

	public getCreationDate(): Date {
		return this.creationDate;
	}

	public getCae(): String {
		return this.cae;
	}

	public setCae(cae: string): void {
		this.cae = cae;
	}

	public getItems(): Array<Item> {
		return this.items;
	}

	constructor() {

		this.id = 0;
		this.totalAmount = 0;
		this.totalItems = 0;
		this.creationDate = new Date();
		this.cae = "";
		this.items = [];
	};

	public get() {

		var aitems: Array<any> = [];
		this.items.forEach((item: Item) => {

			aitems.push({
				totalAmount: item.getTotalAmount(),
				quantity: item.getQuantity(),
				sku: item.getSku(),
				name: item.getName(),
				category: item.getCategory(),
			});
		});

		var aux = {
			id: this.id++,
			totalAmount: this.totalAmount,
			totalItems: this.totalItems,
			date: this.creationDate,
			items: aitems
		};

		return aux;
	}

	public addItem(sku: string) {

		let catalog: Catalog = new Catalog();
		let product: Product = catalog.find(sku);

		const i = this.items.filter(item => (item.sku == sku));
		var item = new Item();

		if (i.length > 0) {
			item = i[0];
			item.setQuantity(item.getQuantity() + 1);
			item.setTotalAmount(product.getPrice() * item.getQuantity());

		} else {

			item.setCategory(product.getCategory());
			item.setName(product.getName());
			item.setQuantity(item.getQuantity() + 1);
			item.setSku(product.getSku());
			item.setCategory(product.getCategory());
			item.setTotalAmount(product.getPrice() * item.getQuantity());
			this.items.push(item);
		}

		this.totalItems++;

		let total: number = 0;
		for (var item of this.items) {
			total = total + item.getTotalAmount();
		}
		this.totalAmount = total;
		console.log("[addItem] totalAmount:" + this.totalAmount + " id:", this.id);
	}

	public deleteItem(sku: string) {

		const i = this.items.filter(item => (item.sku == sku));
		if (i.length > 0) {
			this.totalItems--;
			this.items = this.items.filter(i => i.sku !== sku);
		};

		/* total */
		let total: number = 0;
		for (var item of this.items) {
			total = total + item.getTotalAmount();
		}
		this.totalAmount = total;
	}

	public async close(company: Company) {


		console.log("[close] totalAmount:" + this.totalAmount + " id:", this.id);
		if (company.getEInvoice()) {
			var afip = new Afip();
			var res = await afip.invoice(this);
			this.setCae(res.CAE);
		};

		var app: App = App.get();
		app.orders.add(this);

		/* print */
		//this.print(order);

		/* save */
		var database = new AppDatabase();
		database.addOrder(this);
	};

	private print(order: Order) {

		const device = new Network('172.22.107.201', 9100); //m30iii
		//const device = new Network('192.168.1.10', 9100); //m30iii
		var printer: TmPrinter = new TmPrinter(device, {
			encoding: "GB18030"
		});

		device.open((error) => {

			console.log(error);
			if (error) {
				return;
			}

			//printer.font("e");
			printer.align("lt");
			printer.size(2, 2).style("B").text("SUC 80 COTO SICSA").style("NORMAL").size(1, 1);
			printer.text("FRENCH 2417/29/79");
			printer.text("BARRIO NORTE");
			printer.text("COTO CENTRO INTEGRAL DE COMERCIALIZACION");
			printer.text("CUIT:30-54808315-6 INGRESOS BRUTOS:901-923274-2");
			printer.text("FECHA INICIO ACTIVIDAD COMERCIAL: 19/11/1998");
			printer.text("IVA RESPONSABLE INSCRIPTO A CONSUMIDOR FINAL");
			printer.text("------------------------------------------------"); //48

			var date = new Date(order.getCreationDate()).toLocaleString();
			printer.text(date + " NRO.T.:2080-01093440");

			printer.text("NRO.CAJA:009 NRO.TERM:3701 NRO.TRAN:0796");
			printer.text("------------------------------------------------");
			printer.size(2, 1).style("B").align("ct").text("FACTURA B").style("NORMAL").size(1, 1).align("lt");
			printer.size(1, 1).align("ct").text("ORIGINAL COD.006").style("NORMAL").size(1, 1).align("lt");
			printer.text("------------------------------------------------");

			for (var item of order.getItems()) {

				printer.feed(1);
				var line = "x" + item.getQuantity().toString().padEnd(3, " ") + item.getName().padEnd(33, " ") + "(IVA 21.00)";
				printer.style("B").text(line).style("NORMAL");

				var total = Intl.NumberFormat("en-US", {
					style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'
				}).format(item.getTotalAmount());

				var line = item.getSku().toString().padEnd(40, " ") + total.toString().padStart(8, " ");
				printer.text(line);

			}

			printer.text("------------------------------------------------");
			printer.size(2, 2).style("B").align("rt");

			var total = Intl.NumberFormat("en-US", {
				style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'
			}).format(order.getTotalAmount());
			printer.text("TOTAL:" + total.toString());
			printer.size(1, 1).style("NORMAL").align("lt");
			printer.text("------------------------------------------------");
			printer.align("ct").barcode(112233445566, "EAN13", { width: 2, height: 50 }).align("lt");

			//if (company.getEInvoice()) {
			printer.feed(1);
			printer.style("i");
			printer.text("CAE: " + order.getCae());
			//printer.text("Vto: " + res.CAEFchVto);
			//}
			printer.cut();
			printer.close();
		});
	}

}

export = Order;
