import { AppSettings } from './AppSettings';
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class Company {

	paperReduction: boolean;
	eInvoice: boolean;

	constructor(private http: HttpClient) {

		this.paperReduction = false;
		this.eInvoice = false;
		this.init();
	};

	public getPaperReduction(): boolean {
		return this.paperReduction;
	};

	public getEInvoice(): boolean {
		return this.eInvoice;
	};

	public setup(settings: any): void {
		this.http.post(AppSettings.API_ENDPOINT + '/company', settings).subscribe((data: any) => {
			console.log(data);
		});
	};

	public init() {

		this.http.get(AppSettings.API_ENDPOINT + '/company').subscribe((order: any) => {
			//console.log(order);
		});
	};
}