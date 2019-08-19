import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user.dto';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { StorageService } from 'src/services/storage.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	users: UserDTO[];

	constructor(public userService: UserService,
		public router: Router,
		public authenticationService: AuthenticationService,
		public storage: StorageService) {
	}

	ngOnInit() {
		if (this.storage.getLocalUser() == null) {
			this.authenticationService.logout();
		} else {
			this.userService.findAll()
				.subscribe(response => {
					this.users = response;
				},
					error => {
					});
		}
	}

	insert() {
		this.router.navigate(['userForm']);
	}

	update(id: string) {
		this.router.navigate(['userForm', id]);
	}

}
