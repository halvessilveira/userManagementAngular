import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user.dto';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	users: UserDTO[];

	constructor(public userService: UserService,
		public router: Router) {
	}

	ngOnInit() {

		this.userService.findAll()
			.subscribe(response => {
				this.users = response;
			},
				error => {
					console.log(error);
				});

	}

	insert() {
		this.router.navigate(['userForm']);
	}

	update(id: string) {
		this.router.navigate(['userForm', id]);
	}

}
