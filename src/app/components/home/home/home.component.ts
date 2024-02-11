import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageUrl:string = "https://localhost:44388";
  cars:Car[]=[];
  currentImage : CarImage;
  dataLoaded:boolean = false;
  constructor(
    private carService:CarService,
  ) { }

  ngOnInit(): void {
    this.getCars()
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data.slice(0,6);
      this.dataLoaded=true;
    })
  }

  getCurrentImageClass(car:Car){
    if(car==this.cars[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(car:Car){
    if(car==this.cars[0]){
      return "active"
    } else {
      return ""
    }
  }
}
