import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class creditCardService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'https://localhost:44388/api/';

  isCardExist(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditcards/iscardexist"
    console.log("pepepe")
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcards/getbycardnumber?cardnumber=" + cardNumber
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  updateCard(creditCard:CreditCard){
    let newPath = this.apiUrl + "creditcards/update"
    this.httpClient.put(newPath,creditCard)
  }
}
