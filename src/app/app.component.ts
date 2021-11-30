import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	/* PROPERTIES */
	/* CONSTRUCTOR */
	constructor() {

	}
	/* LIFE HOOKS */
	ngOnInit() {
		console.log('App Component Init');
	}
	/* METHODS */
}
