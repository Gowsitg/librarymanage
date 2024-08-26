import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ModuleserService } from '../../moduleser.service';
import { AddbookdetailsComponent } from '../addbookdetails/addbookdetails.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  takeArray: any;
  borrowedbooksdlt: any;
  returnVlaues: any;
  unid: any;
  currentBookId: any;
  listUsers: any[] = [];
  listBorrowed: any[] = [];
  alreadyborrowedBook: any[] = [];
  borrowedId: any;
  currentBookIds: any;
  constructor(private toastr: ToastrService,private route: ActivatedRoute,private moduleservice: ModuleserService,private router:Router,private authService: AuthService,public dialog: MatDialog){}

  ngOnInit(): void { 
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getUserRole();
    this.route.paramMap.subscribe((params) => {
      this.status = params.get('status')!;
    });

    if(this.userId) {
      this.moduleservice.getUser(this.userId).subscribe(
        data => {
          this.userData = data;
          if(this.userData.role == 1) {
            this.getbookDetails();
          } else {
              this.bookDetails();

          }
        },
      );
    };
   
    
    
  }
 
  editprogile(id: any) {
      this.router.navigate(['admin/registration' +'/' + id])
  }
  
  logout() {
    this.router.navigate(['/admin/login'])
    sessionStorage.clear();
  }

  getbookDetails() {
      this.moduleservice.getBooks().subscribe(data => {
      const filteredData: any[] = [];
      data.forEach((item: any) => {
        if (item[this.userId]) {
          const borrowedBook = item[this.userId];
          filteredData.push(borrowedBook);
        }
      });
        this.dataSource = new MatTableDataSource(filteredData)
      });
  }

  bookDetails() {
    
      this.moduleservice.getBooks().subscribe(data => {
        this.processBooks(data);
      })
  }

  processBooks(addedValues: any[]): void {
    addedValues.forEach(addeditems => {
      const takeaddedbooks = addeditems[Object.keys(addeditems)[0]].bookdata;
      this.listUsers.push(takeaddedbooks);
    });

    // this.moduleservice.booksBorrowed().subscribe(data => {
    //   data.forEach((items: any) => {
    //     const bookDataKey = items[Object.keys(items)[0]];
      
    //       this.listBorrowed.push(bookDataKey);
    //   });
    // });

    console.log(this.listUsers)
   
    this.dataSource = new MatTableDataSource(this.listUsers)
  }

  add(id: any) {
    const userid = this.userData.id
    const dialogRef = this.dialog.open(AddbookdetailsComponent, {
      panelClass: 'custom-dialog-container',
      data: {id},
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
  
  buy(element: any,status: any,id: any) {
    this.moduleservice.booksBorrowed().subscribe(data => {
      const filteredData: any[] = [];
      this.borrowedId = data.length+1;
      data.forEach((item: any) => {
        if (item[element.bookid]) {
          const filterBorrow = item[element.bookid];
          filteredData.push(filterBorrow);
        }
      });

     if(status == 1){
      console.log(this.borrowedId)
      this.unid = this.borrowedId++;
      if (filteredData.length > 0) {
        filteredData.forEach(currentBookId => {
          this.currentBookId = currentBookId;
        });
        if (this.currentBookId.bookdata.bookid == element.bookid && this.currentBookId.buyerdata.id == this.userData.id && this.currentBookId.status == 1) {
              this.toastr.warning('Already Borrowed', ' ');
            } else {
                this.borrowed = new Date;
               
                this.moduleservice.buyBooks(element, this.userData, status,this.borrowed,this.unid).subscribe(res => {
                  this.borrowedbooksdlt = res[element.bookid];
                  element.borrow = res[element.bookid].borrowed;
                  element.return = res[element.bookid].returned;
                  this.currentid = res.id;
                  console.log('Buyer')
                  this.toastr.success('Successfully Borrowed', ' ');
                });
            
        } 
      }
      else {
            this.borrowed = new Date;
            this.moduleservice.buyBooks(element, this.userData, status,this.borrowed,this.unid).subscribe(res => {
              this.borrowedbooksdlt = res[element.bookid];
              element.borrow = res[element.bookid].borrowed;
              element.return = res[element.bookid].returned;
              this.currentid = res.id;
              console.log(this.currentid)
              this.toastr.success('Successfully Borrowed', ' ');

            });
        }
     } 
    });
  }
  

  
  retBook(element: any, status: any,type: any) {
    this.moduleservice.booksBorrowed().subscribe(data => {
      const filteredBooks = data.filter((bookObj: any) => {
        const bookId = Object.keys(bookObj)[0]; 
        const book = bookObj[bookId];
        
        if(type== 'view') {
          return book.bookdata.bookid === element.bookid && book.buyerdata.id === this.userData.id && (book.status == 1 || book.status == 2);
        } else {

          return book.bookdata.bookid === element.bookid && book.buyerdata.id === this.userData.id && book.status == 1;

        }
      });

      if (filteredBooks.length > 0) {
        const matchedBook = filteredBooks[0];
        console.log('Matched book:', matchedBook);
        const id = matchedBook.id;
        this.borrowed = matchedBook[element.bookid].borrowed;
        console.log(this.borrowed)

        if(type == 'view') {
          this.router.navigate(['/management/viewdetails'+'/'+id+'/'+element.bookid])
        } else {
          this.returned = new Date;
          this.moduleservice.updatebuyBooks(element, this.userData, status,this.borrowed,this.unid,this.returned,matchedBook.id).subscribe(res => {
          console.log(res)
          });
        }
      } else {
        console.log('No matching book found');
      }
    });
  }
  
}
