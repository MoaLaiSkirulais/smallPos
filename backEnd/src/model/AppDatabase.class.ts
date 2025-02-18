import { Database } from 'sqlite3';
import Order from './Order.class';
const database = new Database('./dist/server/samllPos-db.sqlite');

class AppDatabase {

	db: any;

	constructor() {
		this.init();
	};

	public init() {

		var command: string =
			`CREATE TABLE IF NOT EXISTS orders (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			creationDate DATETIME NOT NULL, 
			totalAmount REAL NOT NULL,
			totalItems REAL NOT NULL
		    )`;

		database.exec(command);

		var command: string = `
			CREATE VIEW IF NOT EXISTS totals AS 
			SELECT sum(totalAmount) AS total 
			FROM orders;`;

		database.exec(command);

		var command: string = `

			CREATE VIEW  IF NOT EXISTS vwSales AS 

				SELECT strftime('%Y', creationDate) AS date, SUM(totalAmount) AS total, 'ytd' AS range, 'Year' AS label
				FROM orders
				GROUP BY strftime('%Y', creationDate)
								
				UNION 

				SELECT strftime('%m', creationDate) AS date, SUM(totalAmount) AS total, 'mtd' AS range, 'Month' AS label
				FROM orders
				GROUP BY strftime('%m', creationDate)

				UNION 

				SELECT strftime('%d', creationDate) AS date, SUM(totalAmount) AS total, 'dtd' AS range, 'Today' AS label
				FROM orders
				GROUP BY strftime('%d', creationDate)`;

		database.exec(command);
	}

	private formatDate(date: Date): String {

		var ddd = date.getFullYear()
			+ "-" + (date.getMonth() + 1)
			+ "-" + date.getDate()
			+ " " + date.getHours()
			+ ":" + date.getMinutes()
			+ ":" + date.getSeconds();

		return ddd;

	};

	public addOrder(order: Order) {

		var command: string =
			"INSERT INTO orders "
			+ "(creationDate, totalAmount, totalItems)"
			+ "VALUES ("
			+ "'" + this.formatDate(order.getCreationDate()) + "', " //'2007-01-01 10:00:00'
			+ order.getTotalAmount() + ", "
			+ order.getTotalItems()
			+ ")";
		database.exec(command);
	}

	public async getTotals() {

		return await new Promise((resolve, reject) => {

			var command: string = "SELECT * FROM vwSales";
			database.all(command, [], (err, rows: []) => {

				var t: Array<any> = [];
				rows.forEach((row: any) => {
					t.push({ "date": row.range, "total": row.total, "label": row.label });
				});

				resolve(t);
			})
		});
	};

	public async getOrders() {

		return await new Promise((resolve, reject) => {

			var command: string = "SELECT * FROM orders";
			database.all(command, [], (err, rows: []) => {

				//console.log("rows", rows)

				var t: Array<any> = [];
				rows.forEach((row: any) => {
					t.push({ "creationDate": row.creationDate, "totalAmount": row.totalAmount });
				});

				resolve(t);
			})
		});
	};
}

export = AppDatabase;
