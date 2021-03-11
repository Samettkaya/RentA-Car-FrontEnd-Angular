import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from '../models/customerResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
apiUrl="https://localhost:44388/api/customers/getcustomerdetails"
  constructor(private httpClient:HttpClient) { }
  getCustomer(): Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }
}
