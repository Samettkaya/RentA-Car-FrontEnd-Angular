import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted:boolean = false;
  dataLoaded:boolean = false;
  constructor(
    private  formBuilder:FormBuilder,
    private authService:AuthService,
    private toasterService:ToastrService,
  ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.registerForm=this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  register(){
    if(this.registerForm.valid){
      let registerModel =Object.assign({},this.registerForm.value)
        this.authService.register(registerModel).subscribe(response=>{
        this.toasterService.success(response.message,"Başarılı")
        this.dataLoaded=true
        
      }
      ,responseError=>{
       
        if(responseError.error.ValidationErrors.length > 0) {
         
          this.toasterService.error(responseError.error,"Hata!")
        }
        
      })
    }
     else {
      this.toasterService.error("Lütfen tüm alanları doldurunuz","Dikkat!")
    }
  }
}
