import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../model/jwt-dto';
import { LoginUser } from '../model/login-user';
import { NewUser } from '../model/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = environment.apiAuthUrl;

  constructor(private httpClient: HttpClient) { }

  public neww(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.url + '/new', newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.url + '/login', loginUser);
  }
}
