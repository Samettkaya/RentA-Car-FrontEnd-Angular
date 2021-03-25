export interface CreditCard{
    id?:number;
    cardName:string;
    cardNumber:string;
    cardCvc:string;
    cardExpiration:string;
    moneyInTheCard?:number | undefined;
}
