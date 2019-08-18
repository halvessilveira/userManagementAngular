import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	credentials: CredentialsDTO = new CredentialsDTO();

	constructor(
		public router: Router,
		public authenticationService: AuthenticationService) {
	}

	ngOnInit() {
	}

	onSubmit() {
		this.authenticationService.authenticate(this.credentials)
			.subscribe(response => {
				this.authenticationService.successfullLogin(response.headers.get('Authorization'))
				this.router.navigate(['users']);
			},
				error => {
					console.log(error);
				});
	}
}
