import { Injectable } from '@angular/core';
import { CredentialsDTO } from 'src/models/credentials.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/localuser';
import { StorageService } from './storage.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    constructor(public http: HttpClient,
        public storage: StorageService,
        public router: Router
    ) { }

    authenticate(credentials: CredentialsDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            credentials,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    successfullLogin(autorizationValue: string) {
        let token = autorizationValue.substring(7);
        let user: LocalUser = new LocalUser();
        user.token = token;
        user.username = jwt_decode(token)['sub'];
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
        this.router.navigate(['login']);
    }

    isLoggedIn(): boolean {
        if(this.storage.getLocalUser() == null){
            return false;
        }else{
            return true;
        }
    }
}