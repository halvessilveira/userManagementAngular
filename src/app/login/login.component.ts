import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { AuthenticationService } from 'src/services/authentication.service';
import { StorageService } from 'src/services/storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	credentials: CredentialsDTO = new CredentialsDTO();
	msgValidation: string;

	constructor(
		public router: Router,
		public authenticationService: AuthenticationService,
		public storage: StorageService
	) { }

	ngOnInit() {
		this.storage.setLocalUser(null);
	}

	onSubmit() {
		this.authenticationService.authenticate(this.credentials)
			.subscribe(
				response => {
					this.authenticationService.successfullLogin(response.headers.get('Authorization'))
					this.router.navigate(['home']);
				},
				error => {
					this.msgValidation = JSON.parse(error.error).msg;
				});
	}
}
