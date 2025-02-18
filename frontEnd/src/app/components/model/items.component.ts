import { Component, ViewChild, OnInit } from '@angular/core';
import { Item } from '../../model/Item';
import { Order } from '../../model/Order';
import { BackendService } from '../../BackendService';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { rowsAnimation } from "../animations/rowsAnimation.component";
import { fadeOut, blub } from "../animations/rowsAnimation2.component";
import { MutableLiveData } from '@martinporto/mutable-live-data';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-items',
	standalone: true,
	imports: [MatGridListModule, MatTableModule, MatIconModule, CurrencyPipe, MatCardModule],
	animations: [rowsAnimation, fadeOut, blub],
	templateUrl: '../layout/items.component.html',
	styleUrl: '../style/items.component.css',
})

export class ItemsComponent {

	displayedColumns: string[] = ['quantity', 'name', 'totalAmount', 'remove'];
	public backendService: BackendService;

	constructor(private paramBackendService: BackendService) {
		this.backendService = paramBackendService;
	};

}