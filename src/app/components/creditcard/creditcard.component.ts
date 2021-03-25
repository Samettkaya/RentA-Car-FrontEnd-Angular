import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';

import { Rental } from 'src/app/models/rental';
import { creditCardService } from 'src/app/services/creditcard.service';

import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditCardComponent implements OnInit {
  rental:Rental;
  nameOnTheCard:string;
  cardNumber:string;
  cardCvv:string;
  creditCard:CreditCard;
  cardExist:Boolean = false;
  cardExpiration:string;
  constructor(
    private activatedRoute:ActivatedRoute,
    private creditCardService:creditCardService,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
      }
    })
  }

  async rentACar(){
    let creditCard:CreditCard = {cardName:this.nameOnTheCard,cardNumber:this.cardNumber,cardCvc:this.cardCvv,cardExpiration:this.cardExpiration}
    this.cardExist = await this.isCardExist(creditCard)
    if(this.cardExist){
      this.creditCard = await((this.getFakeCardByCardNumber(this.cardNumber))) 
      this.creditCard.moneyInTheCard = this.creditCard.moneyInTheCard - this.rental.totalRentPrice
      this.updateCard(creditCard)
      this.rentalService.addRental(this.rental)
      this.toastrService.success("Arabayı kiraladınız","Işlem başarılı")
    }else{
      this.toastrService.error("Bankanız bilgilerinizi onaylamadı","Kart bulunamadı")
    }
  }

  async isCardExist(creditCard:CreditCard){
    return (await this.creditCardService.isCardExist(creditCard).toPromise()).success
  }

  async getFakeCardByCardNumber(cardNumber:string){
    return (await (this.creditCardService.getCardByNumber(cardNumber)).toPromise()).data[0]
  }

  updateCard(creditCard:CreditCard){
    this.creditCardService.updateCard(creditCard);
  }

}