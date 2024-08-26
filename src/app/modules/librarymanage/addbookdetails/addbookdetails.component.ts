import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ModuleserService } from '../../moduleser.service';

@Component({
  selector: 'app-addbookdetails',
  templateUrl: './addbookdetails.component.html',
  encapsulation: ViewEncapsulation.None,

})
export class AddbookdetailsComponent implements OnInit{
  today: any =new Date();
   public edit: any;
   public bookdata: any;
   public loader: boolean = false;
   public addBooks!: FormGroup;
  constructor(private toastr: ToastrService,
    private formbulider: FormBuilder,private authservice: AuthService,private router:Router,private route: ActivatedRoute,private moduleservice: ModuleserService,
    public dialogRef: MatDialogRef<AddbookdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.addBooks = this.formbulider.group({
      bookid: ['',Validators.required],
      bookname: ['',Validators.required],
      authorname: ['',Validators.required],
      stock: ['',Validators.required],
      added: ['',Validators.required],
    },
    );
    console.log(this.data)
    if(this.data.data) {
      this.edit = true;
      this.addBooks.patchValue({
        bookid: this.data.data.bookid,
        bookname: this.data.data.bookname,
        authorname: this.data.data.authorname,
        stock: this.data.data.stock,
        added: this.data.data.added
      });    }

  }

  get f() {
    return this.addBooks.controls;
  }

  clearForm() {
    this.dialogRef.close();

  }

  submitForm(data: any) {
    if(this.addBooks.valid) {
      this.moduleservice.addbooks(data,this.addBooks.value).subscribe(res => {
        this.toastr.success('Book Added', ' ');
        this.dialogRef.close();
      });
    }

  }

  updateForm(id: any) {
    if(this.addBooks.valid) {
      this.moduleservice.updatedBooks(id,this.addBooks.value).subscribe(res => {
        this.toastr.success('Book Detaile Updated', ' ');
        this.dialogRef.close();
      })
    }
  }

}
``