
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';



@Injectable({
  providedIn: 'root'
})
export class ColorService {

 apiUrl='https://localhost:44388/api/'
  constructor(private httpClient:HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"colors/getall");
  }
  getById(id:number):Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + "colors/getbyid?colorId=" + id;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  addColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "colors/add", color)
  }

  updateColor(color:Color):Observable<ListResponseModel<Color>> {

    return this.httpClient.post<ListResponseModel<Color>>(this.apiUrl + "colors/updated", color)
  }
  
  deleteColor(color:Color):Observable<ResponseModel>{
    
    return this.httpClient.post<ResponseModel>(this.apiUrl + "colors/delete", color)
  }
}