import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
apiUrl="https://localhost:44388/api/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"brands/getall")
  }

  getById(id:number):Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + "brands/getbyıd?brandId=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/add", brand)
  }

  
  updateBrand(brand:Brand):Observable<ListResponseModel<Brand>> {
    return this.httpClient.post<ListResponseModel<Brand>>(this.apiUrl + "brands/updated", brand)
  }
  

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/delete", brand)
  }

}

