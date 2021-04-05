import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { PasswordChangeModel } from 'src/app/models/passwordChangeModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  passwordUpdateForm: FormGroup;
  userForm: FormGroup;
  customerForm: FormGroup;
  user: User;
  customer: Customer;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createPasswordUpdateForm();
  }

  createPasswordUpdateForm(){
    this.passwordUpdateForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
    })
  }

  updatepassord(){
    if(this.passwordUpdateForm.valid){
      this.passwordUpdateForm.addControl("userId",new FormControl(this.authService.getCurrentUserId()))
      let passwordModel:PasswordChangeModel = Object.assign({},this.passwordUpdateForm.value)
      this.authService.changePassword(passwordModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
      },responseError => {
        this.toastrService.error(responseError.error.message,"Hata")

      })
    }else{
      this.toastrService.error("Tüm alanları doldurmanız gerekli","Hata")
    }
  }

}
