import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { DashboardCars } from '../models/dashboard-cars';
import { CarStandart } from '../models/carStandart';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44388/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath= this.apiUrl+"cars/getbyıd?carId="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(
      newPath
    );
  }

  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/add", car)
  }
  
  updateCar(car:CarStandart):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/update", car)
  }

  deletCar(car:CarStandart):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/delete", car)
  }

  
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl+"cars/getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl+"cars/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsBySelect(brandId:number, colorId:number){
    let newPath = this.apiUrl + "cars/getbyselected?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient
      .get<ListResponseModel<Car>>(newPath);
  }
  getCarDetail(carId:number){
    let newPath = this.apiUrl + "cars/getcardetail?carId=" + carId;
    return this.httpClient
      .get<ListResponseModel<Car>>(newPath);
  }
  
  getAllCarDetail(){
    let newPath = this.apiUrl + "cars/getallcardetail"
    return this.httpClient
      .get<ListResponseModel<DashboardCars>>(newPath);
  }
}
