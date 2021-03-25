export interface Rental{
    rentalId?:number,
    // carName:String,
    carId:number;
    rentDate?:Date,
    returnDate?:Date,
    // companyName:String,
    // firstName:String,
    // lastName:String,
    // brandName:String,
    // colorName:String,
    // carDesctiption:String,
    // modelYear:String,
    // dailyPrice:Number,
    // userName:String,
    totalRentPrice?:number | undefined;
}