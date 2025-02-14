import { Database } from 'sqlite3';
import Order from './Order.class';
// const db = new Database('./src/data/database/db.sqlite');
const db = new Database('./dist/server/db.sqlite');

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

		db.exec(command);

		var command: string = `
			CREATE VIEW IF NOT EXISTS totals AS 
			SELECT sum(totalAmount) AS total 
			FROM orders;`;

		db.exec(command);

		var command: string = `

			CREATE VIEW  IF NOT EXISTS totals2 AS 

				SELECT strftime('%Y', creationDate) AS date, SUM(totalAmount) AS total, 'ytd' AS range
				FROM orders
				GROUP BY strftime('%Y', creationDate)
								
				UNION 

				SELECT strftime('%m', creationDate) AS date, SUM(totalAmount) AS total, 'mtd' AS range
				FROM orders
				GROUP BY strftime('%m', creationDate)

				UNION 

				SELECT strftime('%d', creationDate) AS date, SUM(totalAmount) AS total, 'dtd' AS range
				FROM orders
				GROUP BY strftime('%d', creationDate)`;

		db.exec(command);
	}

	private formatDate(date: Date): String {

		var ddd = date.getFullYear()
			+ "-" + (date.getMonth() + 1)
			+ "-" + date.getDate()
			+ " " + date.getHours()
			+ ":" + date.getMinutes()
			+ ":" + date.getSeconds();

		console.log("ddd", ddd);
		return ddd;

	};

	public addOrder(order: Order) {

		var command: string =
			"INSERT OR REPLACE INTO orders "
			+ "(id, creationDate, totalAmount, totalItems)"
			+ "VALUES ("
			+ order.getId() + ", "
			+ "'" + this.formatDate(order.getCreationDate()) + "', " //'2007-01-01 10:00:00'
			+ order.getTotalAmount() + ", "
			+ order.getTotalItems()
			+ ")";
		console.log(command);
		db.exec(command);
	}

	public async getTotals() {

		return await new Promise((resolve, reject) => {

			var command: string = "SELECT * FROM totals2";
			db.all(command, [], (err, rows: []) => {

				var t: Array<any> = [];
				rows.forEach((row: any) => {
					t.push({ "date": row.range, "total": row.total });
				});

				resolve(t);
			})
		});
	};
	
	public async getOrders() {

		return await new Promise((resolve, reject) => {

			var command: string = "SELECT * FROM orders";
			db.all(command, [], (err, rows: []) => {

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
