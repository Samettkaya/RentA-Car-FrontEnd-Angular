import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Color } from "src/app/models/color";
import { ColorService } from "src/app/services/color.service";

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {
 
  color:Color;
  colorUpdateForm : FormGroup;
  
  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.getColorById(params["colorId"])
      }
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ["",Validators.required]
    })
  }

  getColorById(colorId:number){
    this.colorService.getById(colorId).subscribe((response) => {
      this.color = response.data;
    });
  }

  updateColor(){
    if(this.colorUpdateForm.valid){      
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      colorModel.colorId = Number(this.color.colorId)
      console.log(colorModel.id)
      this.colorService.updateColor(colorModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        this.toastrService.success(responseError.message)
      })
    }else{
      this.toastrService.error("Form eksik","Hata")
    }    
  }

}
