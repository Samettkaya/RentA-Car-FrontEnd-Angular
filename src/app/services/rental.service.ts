import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RentalResponseModel } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
apiUrl="https://localhost:44388/api/rentals/getallrentaldto"
  constructor(private httpClient:HttpClient) { }

  getRental(): Observable<RentalResponseModel>{


    return this.httpClient.get<RentalResponseModel>(this.apiUrl);

  }
}
