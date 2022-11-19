import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
/**Estos valores estarán guardados en el navegador, Application/Storage/Session Storage*/

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string>= [];
  constructor() { }

  public setToken (token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * getToken
   */
  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public setUserName (userName: string): void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  /**
   * getUserName
   */
  public getUserName(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  /**
   * setAuthorities
   */
  public setAuthorities(authorities: string[]):void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  /**
   * getAuthorities 
   */
  public getAuthorities (): string[] {
    this.roles = []; //si está lleno, lo vaciamos
    if (sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      }); 
      
    }
    return this.roles;    
  }

  /**
   * logOut
   */
  public logOut():void {
     window.sessionStorage.clear();
     console.log("cierro sesión...")    ;
  }
}
