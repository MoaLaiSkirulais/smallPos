import TmPrinter = require('../model/TmPrinter.class');
import Network from "@node-escpos/network-adapter";


class Company {

	private paperReduction: boolean;
	private eInvoice: boolean;


	constructor() {

		this.paperReduction = false;
		this.eInvoice = false;


	};

	public getPaperReduction(): boolean {
		return this.paperReduction;
	}

	public getEInvoice(): boolean {
		return this.eInvoice;
	}

	public async setup(settings: any) {

		this.paperReduction = settings[0];
		this.eInvoice = settings[1];

		//const device = new Network('172.22.107.47', 9100); //m30iii
		const device = new Network('192.168.1.10', 9100); //m30iii
		var tmPrinter = new TmPrinter(device, {
			encoding: "GB18030"
		});

		device.open(() => {

			if (this.paperReduction) {
				tmPrinter.paperReductionOn();
			} else {
				tmPrinter.paperReductionOff();
			};


			tmPrinter.close();
		});		
	}
}

export = Company;
