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
		public router: Router){
	}
	
	ngOnInit(){
		
		/*
		this.users = [
			{id: '1', username: 'Sentence 1', password : '', nome : '', createTimestamp : '', updateTimestamp : ''},
			{id: '2', username: 'Sentence 2', password : '', nome : '', createTimestamp : '', updateTimestamp : ''},
			{id: '3', username: 'Sentence 3', password : '', nome : '', createTimestamp : '', updateTimestamp : ''},
			{id: '4', username: 'Sentenc4 ', password : '', nome : '', createTimestamp : '', updateTimestamp : ''},
		];
		console.log(this.users);
		*/
		
		
		this.userService.findAll()
			.subscribe(response => {
				this.users = response;
			},
			error =>{
				console.log(error);
			});
		
	}
	
	userForm(){
		this.router.navigate(['userForm']);
	}
}
