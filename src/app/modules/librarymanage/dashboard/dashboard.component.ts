import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ModuleserService } from '../../moduleser.service';
import { AddbookdetailsComponent } from '../addbookdetails/addbookdetails.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  id: string;
  bookid: string;
  bookname: string;
  authrname: string;
  added: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent implements OnInit{

  displayedColumns: string[] = ['id', 'bookid','bookname','authorname','added','action'];
  dataSource: any;
  userId: any;
  id: any;
  userData: any;
  userRole: any;
  buyersData: any;
  status: any;
  borrowed: any;
  returned: any;
  currentid: any;

  constructor(private route: ActivatedRoute,private moduleservice: ModuleserService,private router:Router,private authService: AuthService,public dialog: MatDialog){}

  ngOnInit(): void { 
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getUserRole();
    // console.log('User ID:', this.userId);
    this.route.paramMap.subscribe((params) => {
      this.status = params.get('status')!;
    });

    if(this.userId) {
      this.moduleservice.getUser(this.userId).subscribe(
        data => {
          this.userData = data;
         
          // console.log('User Data:', this.userData);
        },
      );
    };

    this.getbookDetails();

    
  }
 
  editprogile(id: any) {
      this.router.navigate(['admin/registration' +'/' + id])
  }
  
  logout() {
    this.router.navigate(['/admin/login'])
    sessionStorage.clear();
  }

  getbookDetails() {
      this.moduleservice.getBooks().subscribe(res => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
      });


  }

  add() {
    const dialogRef = this.dialog.open(AddbookdetailsComponent, {
      panelClass: 'custom-dialog-container',
      data: { },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getbookDetails();
    });

  }

  edit(data: any) {
   
    const dialogRef = this.dialog.open(AddbookdetailsComponent, {
      panelClass: 'custom-dialog-container',
      data: {data},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getbookDetails();
    });
  }

  View(id: any) {
    this.router.navigate(['/management/viewdetails'+'/'+id])
  }

  Viewbook(id: any,currentid: any) {
    this.router.navigate(['/management/viewdetails'+'/'+id+'/'+currentid])
  }
  
  buy(element: any,status: any) {
    if(status == 1 || status == null) {
      this.borrowed = new Date;
      this.moduleservice.buyBooks(element, this.userData, status,this.borrowed,this.returned).subscribe(res => {
        element.status = res[element.bookid].status;
        element.borrow = res[element.bookid].borrowed;
        element.return = res[element.bookid].returned;
        this.currentid = res.id;
        console.log(res)
      });
  
    } 
  
    }

  retBook(element: any,currentid: any, status: any) {
   
      this.returned = new Date;
      this.moduleservice.returnBooks(element, this.userData,currentid, status,this.borrowed,this.returned).subscribe(res => {
        element.status = res[element.bookid].status;
        element.borrow = res[element.bookid].borrowed;
        element.return = res[element.bookid].returned;
        console.log(res)
      });
  
    
  }   
  
}
