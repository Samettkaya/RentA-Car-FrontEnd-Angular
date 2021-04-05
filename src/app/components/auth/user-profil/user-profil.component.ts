import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  lastName=this.authService.name;
  firstName=this.authService.surname;
  email=this.authService.email;
  constructor(
    private authService:AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getbyid(this.authService.userId).subscribe(response => {
      this.user = response.data
      this.userForm.patchValue(response.data)
    })
  }


}
