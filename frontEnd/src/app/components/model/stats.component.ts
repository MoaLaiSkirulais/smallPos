import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BackendService } from '../../BackendService';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Stats } from '../../model/Stats';

@Component({
	selector: 'app-stats',
	standalone: true,
	imports: [MatSlideToggleModule,  MatCardModule, CurrencyPipe, MatTableModule],
	templateUrl: '../layout/stats.component.html',
	styleUrl: '../style/stats.component.css'
})

export class StatsComponent {

	displayedColumns: string[] = ['label', 'total'];
	@ViewChild(MatTable) table: MatTable<Stats>;
	public backendService: BackendService

	constructor(private http: HttpClient, private paramBackendService: BackendService) {
		this.backendService = paramBackendService;
		this.backendService.loadSales();
	};
}