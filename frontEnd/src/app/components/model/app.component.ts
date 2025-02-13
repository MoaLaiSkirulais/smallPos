import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { DOCUMENT } from '@angular/common';
import { Inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Company } from '../../model/Company';
import { BackendService } from '../../BackendService';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

export interface Tile {
	color: string;
	cols: number;
	rows: number;
	text: string;
}

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		
		MatGridListModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatSlideToggleModule,
		MatSlideToggleModule,
		FormsModule,
		MatButtonModule,
		MatListModule,
		RouterModule,
		
	],
	templateUrl: '../layout/app.component.html',
	styleUrl: '../style/app.component.css'
})

export class AppComponent implements OnInit {

	title = 'Small Pos';
	showFiller = false;
	dataService: BackendService
	company: Company;
	@ViewChild('drawer') drawer: MatSidenav;

	constructor(@Inject(DOCUMENT) private document: any, public dataService1: BackendService, router: Router) {

		this.company = dataService1.getCompany();

		router.events.subscribe(event => {
			try {
				this.drawer.close();
			} catch (e) { };
		});
	};
	elem: any;

	ngOnInit() {
		this.elem = document.documentElement;
	}

	setup() {
		this.company.setup([this.company.paperReduction, this.company.eInvoice]);
	}

	openFullscreen() {

		if (this.elem.requestFullscreen) {
			this.elem.requestFullscreen();
		} else if (this.elem.mozRequestFullScreen) {
			/* Firefox */
			this.elem.mozRequestFullScreen();
		} else if (this.elem.webkitRequestFullscreen) {
			/* Chrome, Safari and Opera */
			this.elem.webkitRequestFullscreen();
		} else if (this.elem.msRequestFullscreen) {
			/* IE/Edge */
			this.elem.msRequestFullscreen();
		}
	}

	closeFullscreen() {

		if (this.document.exitFullscreen) {
			this.document.exitFullscreen();
		} else if (this.document.mozCancelFullScreen) {
			/* Firefox */
			this.document.mozCancelFullScreen();
		} else if (this.document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			this.document.webkitExitFullscreen();
		} else if (this.document.msExitFullscreen) {
			/* IE/Edge */
			this.document.msExitFullscreen();
		}
	}
}
