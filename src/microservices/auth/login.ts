import { inject } from 'aurelia-dependency-injection';
import { AuthClient } from './authClient';

@inject(AuthClient)
export class LoginCustomElement {
  constructor(ac: AuthClient){
    this.authClient = ac;
  }

  authClient: AuthClient
  userId: string;
  password: string;
  errorMessage: string = '';

  async login(){
    this.errorMessage = "";
    if(!this.userId || !this.password){
      return;
    }
    let response = await this.authClient.login(this.userId, this.password);
    if(!response){
      this.errorMessage = "Login failed";
    }
  }
}
