import { Injectable } from '@angular/core';
import { LocalUser } from 'src/models/localuser';
import { STOREAGE_KEYS } from 'src/config/storage_keys.config';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STOREAGE_KEYS.localuser);
        if (user == null) {
            return null;
        } else {
            return JSON.parse(user);
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STOREAGE_KEYS.localuser);
        } else {
            localStorage.setItem(STOREAGE_KEYS.localuser, JSON.stringify(obj));
        }
    }

    getUsername(): string{
        if(this.getLocalUser() != null){
            return this.getLocalUser().username;
        }
        return null;
    }
}