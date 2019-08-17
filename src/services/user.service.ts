import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { UserDTO } from '../models/user.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

	constructor(public http: HttpClient) {
	}

	findAll(): Observable<UserDTO[]> {
		return this.http.get<UserDTO[]>(`${API_CONFIG.baseUrl}/users`)
	}

	find(id: string): Observable<UserDTO> {
		return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/users/${id}`)
	}

	insert(obj: UserDTO) {
		return this.http.post(
			`${API_CONFIG.baseUrl}/users`,
			obj,
			{
				observe: 'response',
				responseType: 'text'
			}
		)
	}

	update(obj: UserDTO) {
		return this.http.put(
			`${API_CONFIG.baseUrl}/users/${obj.id}`,
			obj,
			{
				observe: 'response',
				responseType: 'text'
			}
		)
	}

	delete(obj: UserDTO) {
		return this.http.delete(
			`${API_CONFIG.baseUrl}/users/${obj.id}`,
			{
				observe: 'response',
				responseType: 'text'
			}
		)
	}
}
