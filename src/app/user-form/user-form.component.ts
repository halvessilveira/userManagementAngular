import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { UserDTO } from 'src/models/user.dto';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: UserDTO = new UserDTO();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.userService.find(id)
        .subscribe(response => {
          this.user = response;
        },
          error => {
            console.log(error);
          });
    }
  }

  onSubmit() {
    if (this.user.id == null) {
      console.log('insert');
      this.userService.insert(this.user)
        .subscribe(response => {
          this.router.navigate(['users']);
        },
          error => {
            console.log(error);
          });
    } else {
      console.log('update');
      this.userService.update(this.user)
        .subscribe(response => {
          this.router.navigate(['users']);
        },
          error => {
            console.log(error);
          });
    }
  }

  delete() {
    if (confirm('Delete?')) {
      this.userService.delete(this.user)
        .subscribe(response => {
          this.router.navigate(['users']);
        },
          error => {
            console.log(error);
          });
    }
  }

  cancel() {
    this.router.navigate(['users']);
  }
}
