import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  
})
export class LoginComponent implements OnInit{

  public loginform!: FormGroup;
  public hidebtn: boolean = false;
  public loader: boolean = false;
  public getValues: any;
  constructor(private toastr: ToastrService,private formbulider: FormBuilder,private authservice: AuthService,private router:Router){}
 
  ngOnInit(): void {
    
     this.loginform = this.formbulider.group({
       username: ['',Validators.required],
       password: ['',Validators.required],
     })
  }

  get fform() {
    return this.loginform.controls;
  }

  submitForm(): void {
    if(this.loginform.valid) { 
      this.loader = true;
      this.getValues= false;
      
      this.authservice.login(this.fform['username'].value, this.fform['password'].value).subscribe(
      res =>  {
        this.loader = false;
        this.toastr.success('Successfully Login', ' ');
        this.router.navigate(['/management/dashboard'])
      },

      error => {
        this.toastr.warning('Invalid Credentials', ' ');
         this.getValues= true;
         this.loader = false;
      }
       )
    }
  }

  signupaccount() {
    this.router.navigate(['/admin/registration']);
  }
}
