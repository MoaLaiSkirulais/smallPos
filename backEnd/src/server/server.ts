/** Import the 'express' module along with 'Request' and 'Response' types from express */
import express, {
	Request,
	Response
} from 'express';

var cors = require('cors');

import Catalog = require('../model/Catalog.class');
import Order = require('../model/Order.class');
import Afip = require('../model/Afip.class');
import Company = require('../model/Company.class');
import Orders = require('../model/Orders.class');
import App = require('../model/App.class');
import AppDatabase = require('../model/AppDatabase.class');

const app = express();
app.use(cors());
app.use(express.json());


const port: number = 3000;

var order = new Order();
var afip = new Afip();
var company = new Company();
var orders = new Orders();

app.get('/products', (req: Request, res: Response) => {
	var catalog = new Catalog();
	res.status(200).json(catalog.getProducts());
});

app.get('/order', (req: Request, res: Response) => {
	res.status(200).json(order.get());
});

app.post('/order', (req: Request, res: Response) => {
	order = new Order();
	res.status(200).json(order.get());
});

app.post('/order/items', (req: Request, res: Response) => {
	order.addItem(req.body.sku);
	res.status(200).json(order.get());
});

app.delete('/order/items', (req: Request, res: Response) => {
	order.deleteItem(req.body.sku);
	res.status(200).json(order.get());
});

app.get('/order/close', async (req: Request, res: Response) => {
	//console.log("order close", order)
	await order.close(company);
	// res.status(200).json([order.getCae()]);
	//order = new Order();
	res.status(200).json(order.get());
});

app.get('/afip', async (req: Request, res: Response) => {
	res.status(200).json(await afip.invoice(order));
});

app.post('/company', (req: Request, res: Response) => {
	company.setup(req.body);
	var j = [company.getPaperReduction(), company.getEInvoice()];
	res.status(200).json(j);
});

app.get('/company', (req: Request, res: Response) => {
	var j = [company.getPaperReduction(), company.getEInvoice()];
	res.status(200).json(j);
});

app.get('/orders', (req: Request, res: Response) => {
	var app:App = App.get();
	var j = app.orders.get();
	res.status(200).json(j);
});

app.get('/orders/totals', async (req: Request, res: Response) => {
	var database = new AppDatabase();
	var msg  = await database.getTotals();
	res.status(200).json(msg);
});

async function  test(){
	var database = new AppDatabase();
}

/** Start the server and listen on the specified port */
app.listen(port, '0.0.0.0', () =>  {
	test();
	console.log(`Server is running on http://localhost:${port}`);

});

