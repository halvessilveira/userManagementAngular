import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/models/user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: UserDTO = {
		id: '',
		username: '',
		password: '',
		nome: '',
		createTimestamp: '',
		updateTimestamp: ''
	};

	constructor(public router: Router){
	}

	ngOnInit() {
	}
	
	signIn(){
		console.log(this.user);
		this.router.navigate(['users']);
	}
}
