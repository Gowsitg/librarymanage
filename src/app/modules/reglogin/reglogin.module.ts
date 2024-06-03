import { NgModule } from '@angular/core';
import { CommonModule,NgIf } from '@angular/common';

import { RegloginRoutingModule } from './reglogin-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MaterialModule } from 'src/app/material-modules';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    
  ],
  imports: [
    CommonModule,
    RegloginRoutingModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [ToastrService],
})
export class RegloginModule { }
