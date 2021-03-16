import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  currentBrand:Brand={brandId:0,brandName:""};
  dataLoaded=false;

  constructor(private brandService:BrandService,) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    });
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }
  removeCurrentBrand(){
    this.currentBrand = {brandId:0,brandName:""};
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active cursorPointer"
    }
    else{
      return "list-group-item cursorPointer"
    }
    
  }
  
  getAllBrandClass(){
    let defaultBrand:Brand ={brandId:0,brandName:""};
    if(this.currentBrand.brandId == defaultBrand.brandId){ 
      return "list-group-item active cursorPointer";
    } else {
      return "list-group-item cursorPointer";
    }
  }
}
