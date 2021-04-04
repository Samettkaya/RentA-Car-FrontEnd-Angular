import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { CarService } from '../../../../../services/car.service';
import { BrandService } from '../../../../../services/brand.service';
import { ColorService } from '../../../../../services/color.service';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  apiUrl="https://localhost:44388/api/";
  brands:Brand[];
  colors:Color[];
  carAddForm:FormGroup;

  constructor(private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelYear:["",Validators.required],
      description:["",Validators.required]
  
    })
  }

  addCar(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(
        response => {
        this.toastrService.success(response.message,"Başarılı")
        this.router.navigate(['admin', 'cars']);
        },
       
        responseError => {
        if(responseError.error.ValidationErrors.length > 0) {
          for(let i=0;i<responseError.error.ValidationErrors.length;i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Araç Eklenemedi")
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik","Dikkat!")
    }
  }





}