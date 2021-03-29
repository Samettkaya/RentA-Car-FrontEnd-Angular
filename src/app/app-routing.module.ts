import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CreditCardComponent } from './components/creditcard/creditcard.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarEditComponent } from './components/car/car-edit/car-edit.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { ColorsDashboardComponent } from './components/pages/admin-dashboard/colors-dashboard/colors-dashboard.component';
import { ColorAddComponent } from './components/pages/admin-dashboard/colors-dashboard/color-add/color-add.component';
import { ColorEditComponent } from './components/pages/admin-dashboard/colors-dashboard/color-edit/color-edit.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},  
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},
  {path:"car/details/:carId", component:CarDetailComponent},
  {path:"cars/car-detail/:carId", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"car/rental/:carId",component:RentalComponent},
  {path:"creditcard/:rental", component:CreditCardComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"cars/edit",component:CarEditComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
  //     {
  //       path: 'cars',
  //       component: CarsDashboardComponent,
  //     },
      // {
      //   path: 'cars/add',
      //   component: CarAddFormComponent,
      // },
      // {
      //   path: 'cars/edit/:id',
      //   component: CarEditFormComponent,
      // },
      // {
      //   path: 'cars/edit/images/:carId',
      //   component: CarImageFormComponent,
      // },
      // {
      //   path: 'brands',
      //   component: BrandsDashboardComponent,
      // },
      // {
      //   path: 'brands/add',
      //   component: BrandAddFormComponent,
      // },
      // {
      //   path: 'brands/edit/:id',
      //   component: BrandEditFormComponent,
      // },
      {
        path: 'colors',
        component: ColorsDashboardComponent,
      },
      {
        path: 'colors/add',
        component: ColorAddComponent,
      },
      {
        path: 'colors/edit/:colorId',
        component: ColorEditComponent,
      },
    ],

  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
