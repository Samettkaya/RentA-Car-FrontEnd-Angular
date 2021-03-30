import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { DashboardCars } from 'src/app/models/dashboard-cars';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars-dashboard',
  templateUrl: './cars-dashboard.component.html',
  styleUrls: ['./cars-dashboard.component.css']
})
export class CarsDashboardComponent implements OnInit {

  cars:DashboardCars[]=[];
  dataLoaded=false;
  constructor(
    private carService:CarService,
  ) { }

  ngOnInit(): void {
    this.getCars()
  }

  getCars(){
    this.carService.getAllCarDetail().subscribe(response => {
      this.cars=response.data,
      this.dataLoaded=true

    })
  }
}
