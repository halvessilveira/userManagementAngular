import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    if (!this.authenticationService.isLoggedIn()) {
      this.authenticationService.logout();
    }
  }

}
