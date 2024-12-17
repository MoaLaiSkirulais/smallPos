import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../../DataService';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Totals } from '../../model/Totals';

@Component({
	selector: 'app-totals',
	standalone: true,
	imports: [MatSlideToggleModule,  MatCardModule, CurrencyPipe, MatTableModule],
	templateUrl: './totals.component.html',
	styleUrl: './totals.component.css'
})

export class TotalsComponent {

	displayedColumns: string[] = ['date', 'total'];
	@ViewChild(MatTable) table: MatTable<Totals>;
	public dataService: DataService

	constructor(private http: HttpClient, private dataService1: DataService) {
		this.dataService = dataService1;
	};


}