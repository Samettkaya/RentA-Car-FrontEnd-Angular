import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44388/api/';
  constructor(
    private httpClient: HttpClient
  ) { }

  getbyid(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/getbyıd?userId=" + userId
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  updateInfos(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/updated"
    return this.httpClient.put<ResponseModel>(newPath,user)
  }
}