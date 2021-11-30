import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GRAPH_API_ENDPOINT } from '../_config';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	/* PROPERTIES */
	profile!: ProfileType;
	private endpoint: string;
	/* CONSTRUCTOR */
	constructor(private http: HttpClient) {
		this.endpoint = GRAPH_API_ENDPOINT + '/v1.0/me';
	}
	/* LIFE HOOKS */
	ngOnInit() {
		this.getProfile();
	}
	/* METHODS */
	getProfile = () =>  this.http.get(this.endpoint)
			.subscribe(profile => {this.profile = profile;});
}
