import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ModuleserService } from '../../moduleser.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  encapsulation: ViewEncapsulation.None,

})
    export class RegistrationComponent {

  public registerForm!: FormGroup;
  public loader: boolean = false;
  public productId: any;
  constructor(private toastr: ToastrService,private formbulider: FormBuilder,private authservice: AuthService,private router:Router,private route: ActivatedRoute,private moduleservice: ModuleserService){}
 
   ngOnInit(): void {
       
     this.registerForm = this.formbulider.group({
       name: ['',[Validators.required,Validators.minLength(6)]],
       emailid: ['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
       mobilenumber: ['',[Validators.required,Validators.minLength(10)]],
       role: ['',Validators.required],
       password: ['',[Validators.required,Validators.minLength(6)]],
       confirmpassword: ['',Validators.required],
     },
     {
      validator: ConfirmPasswordValidator("password", "confirmpassword")
    }
     )

     this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;

    });

    if(this.productId) {
      this.moduleservice.getUser(this.productId).subscribe(
        data => {
          this.registerForm.patchValue(data)
        },
      ); }
   
    
  }
  data(data: any) {
    throw new Error('Method not implemented.');
  }

  get f() {
    return this.registerForm.controls;
  }

  clearForm() {
    this.registerForm.reset()
  }

  submitForm(): void {

    if(this.registerForm.valid) { 
      this.loader = true;
      this.authservice.registered(this.registerForm.value).subscribe(res =>  {
        this.loader = false;
        this.registerForm.reset();
       this.toastr.success('Successfully Registered', ' ');
       this.router.navigate(['/admin/login']);
      },
       )
    }
   }

   cancel() {
    this.router.navigate(['/management/dashboard']);
   }
   
   updateForm(id: any): void {

    if(this.registerForm.valid) { 
      this.loader = true;
      this.authservice.updated(id,this.registerForm.value).subscribe(res =>  {
        this.loader = false;
        this.registerForm.reset();
       this.toastr.success('Successfully Updated', ' ');
       this.router.navigate(['/management/dashboard']);
      },
       )
    }
   }

  loginaccount() {
    // sessionStorage.setItem('userid', this.productId.toString());
    this.router.navigate(['/admin/login']);
  }

    
}

function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName]
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmPasswordValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

