import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from"@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  dataLoaded=false
  constructor(
    private  formBuilder:FormBuilder,
    private authService:AuthService,
    private toasterService:ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  this.createLoginForm();
}
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }


  login(){
    let isSessionActive=localStorage.getItem("token")
    if(
      isSessionActive=="0"||
      isSessionActive==undefined||
      !(isSessionActive=="1")
    ){
       if(this.loginForm.valid){
      let loginModel =Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toasterService.success(response.message,"Başarılı");
        localStorage.setItem("token",response.data.token);
        this.dataLoaded=true;
        this.authService.onRefresh();
        this.router.navigate(['/home']);
      }
      ,responseError=>{
        
        this.toasterService.error(responseError.error,"Hata!")
      })
    }
     else {
      this.toasterService.error("Lütfen tüm alanları doldurunuz","Dikkat!")
    }
    }
   
  }
}