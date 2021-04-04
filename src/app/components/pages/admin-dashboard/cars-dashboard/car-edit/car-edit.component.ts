import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  car: Car;
  carImages:CarImage[]=[];
  carUpdateForm: FormGroup;
  colors: Color[] = [];
  brands: Brand[] = [];
  selectedColor: number;
  selectedBrand: number;
  modelYearList: number[] = [];

  imageUrl="https://localhost:44388";

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private brandService: BrandService,
    private carImageService:CarImageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.createUpdateForm();
        this.getCurrentCar(params["carId"]);
        this.getColors();
        this.getBrands();
        this.createModelYearArray();
      }
      this.getImagesByCarId();
    });
  }

  createModelYearArray() {
    let currentYear: number = new Date().getFullYear();
    for (let i = currentYear + 1; i >= 1950; i--) {
      this.modelYearList.push(i);
    }
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }
  getImagesByCarId(){
    
    this.carImageService.getCarImages(this.activatedRoute.snapshot.params["carId"]).subscribe((response)=>{
      this.carImages=response.data;      
    });
  }
  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getCurrentCar(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.car = response.data;
      this.selectedBrand = this.car.brandId;
      this.selectedColor = this.car.colorId;
      this.carUpdateForm.get('colorId')?.setValue(this.selectedColor);
      this.carUpdateForm.get('brandId')?.setValue(this.selectedBrand);
      this.carUpdateForm.get('carId')?.setValue(this.car.carId);
      this.carUpdateForm.get('carName')?.setValue(this.car.carName);
      this.carUpdateForm.get('dailyPrice')?.setValue(this.car.dailyPrice);
      this.carUpdateForm.get('description')?.setValue(this.car.description);
      this.carUpdateForm.get('modelYear')?.setValue(this.car.modelYear);
      // this.carUpdateForm.get('findeksScore')?.setValue(this.car.findeksScore);
    });
  }
  get carFormControls() { return this.carUpdateForm.controls; }

  createUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ["", Validators.required],
      carName: ["", Validators.required],
      colorId: ["", Validators.required],
      brandId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      // findeksScore: ["", Validators.required]
    });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
    
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      carModel.modelYear = parseInt(carModel.modelYear);

      this.carService.updateCar(carModel).subscribe(response => {
        this.toastrService.success("Araba başarıyla güncellendi.");
        this.router.navigate(['/admin/cars']);
        this.toastrService.info("Arabalar düzenleme sayfasına yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            const element = responseError.error.ValidationErrors[i];
            this.toastrService.error(element.ErrorMessage, "Araç Güncellenemedi");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }

  }

  deleteCar() {
    if (window.confirm('Arabayı sildiğine emin misin?')) {
      let carModule: Car = {
        carId: this.car.carId,
        ...this.carUpdateForm.value,
      }; 
      this.carService.deletCar(carModule).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['admin', 'cars']);
         
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0)
            responseError.error.Errors.forEach((error: any) =>
              this.toastrService.error(error.ErrorMessage)
            );
        }
      );
    }
  }

}
