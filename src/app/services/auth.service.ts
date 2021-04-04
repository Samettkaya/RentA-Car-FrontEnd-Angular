import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44388/api/auth/";
  constructor(
    private httpClient:HttpClient,
    private router: Router,
 
  ) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
    // this.userSubject.next(null);
    this.router.navigate(['/login']);
}

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false
    }
  }
}
