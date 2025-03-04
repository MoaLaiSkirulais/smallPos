import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Order } from '../../model/Order';
import { BackendService } from '../../BackendService';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
	selector: 'app-order',
	standalone: true,
	imports: [MatSlideToggleModule, MatButton, MatCardModule, CurrencyPipe, MatIconModule],
	templateUrl: '../layout/order.component.html',
	styleUrl: '../style/order.component.css'
})

export class OrderComponent {

	backendService: BackendService;

	constructor(private http: HttpClient, private paramBackendService: BackendService) {
		this.backendService = paramBackendService;
	};


}