import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserDTO } from 'src/models/user.dto';
import { UserService } from 'src/services/user.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { StorageService } from 'src/services/storage.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    user: UserDTO = new UserDTO();
    msgValidation: string;
    fields: String[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        public authenticationService: AuthenticationService,
        public storage: StorageService
    ) { }

    ngOnInit() {
        if (!this.authenticationService.isLoggedIn()) {
            this.authenticationService.logout();
        } else {
            let id = this.activatedRoute.snapshot.paramMap.get('id');
            if (id != null) {
                this.userService.find(id)
                    .subscribe(
                        response => {
                            this.user = response;
                        },
                        error => {
                            this.router.navigate(['userList']);
                        });
            }
        }
    }

    onSubmit() {
        if (this.user.id == null) {
            this.userService.insert(this.user)
                .subscribe(
                    response => {
                        this.router.navigate(['userList']);
                    },
                    error => {
                        this.msgValidation = JSON.parse(error.error).msg;
                        this.fields = JSON.parse(error.error).errors;
                    });
        } else {
            this.userService.update(this.user)
                .subscribe(response => {
                    this.router.navigate(['userList']);
                },
                    error => {
                        this.msgValidation = JSON.parse(error.error).msg;
                        this.fields = JSON.parse(error.error).errors;
                    });
        }
    }

    delete() {
        if (confirm('Delete?')) {
            this.userService.delete(this.user)
                .subscribe(
                    response => {
                        this.router.navigate(['userList']);
                    },
                    error => {
                        this.msgValidation = JSON.parse(error.error).msg;
                    });
        }
    }

    error403() {
        this.authenticationService.logout();
    }
}
