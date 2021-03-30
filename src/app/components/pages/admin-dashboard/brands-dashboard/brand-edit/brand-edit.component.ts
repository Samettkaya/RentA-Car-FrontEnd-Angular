import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  brand:Brand;
  brandEditForm : FormGroup;
  
  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private toastrService: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getBrandById(params["brandId"])
      }
    })
  }

  createBrandUpdateForm(){
    this.brandEditForm = this.formBuilder.group({
      brandName: ["",Validators.required]
    })
  }

  getBrandById(brandId:number){
    this.brandService.getById(brandId).subscribe((response) => {
      this.brand = response.data;
    });
  }

  updateBrand(){
    if(this.brandEditForm.valid){      
      let brandModel = Object.assign({},this.brandEditForm.value)
      brandModel.brandId = Number(this.brand.brandId)
      this.brandService.updateBrand(brandModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        this.toastrService.success(responseError.message)
      })
    }else{
      this.toastrService.error("Form eksik","Hata")
    }    
  }



  
  deleteBrand() {
    if (window.confirm('Marka Sildiğine emin misin?')) {
      let brandModule: Brand = {
        brandId: this.brand.brandId,
        ...this.brandEditForm.value,
      };
      this.brandService.deleteBrand(brandModule).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['admin', 'brands']);
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
