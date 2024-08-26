import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleserService } from '../../moduleser.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: string;
  name: string;
  emailid: string;
  mobilenumber: string;
  status: any;
}

@Component({
  selector: 'app-borrowdetails',
  templateUrl: './borrowdetails.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BorrowdetailsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name','emailid','mobilenumber','status', 'borrow','return'];
  dataSource: any;
  BookId: any;
  borrowedBooks: any;
  buyersId: any;
  currentid: any;
  booksinfo: any;
  role: number = 1;
  constructor(private router:Router,private route: ActivatedRoute,private moduleservice: ModuleserService){}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.BookId = params.get('id')!;
      this.currentid = params.get('currentid')!;
    });
    
    if (this.currentid) {
       this.role = 2;
       this.getBorrowBook();
    } else {
      this.role = 1;
      this.getborroedBooksDetails(); 
    }

     
}

 getborroedBooksDetails() {
  if (this.BookId) {
    this.moduleservice.borrowDetails().subscribe(data => {
      const filteredData: any[] = [];
    data.forEach((item: any) => {
      if (item[this.BookId]) {
        const borrowedBook = item[this.BookId];
        this.borrowedBooks = borrowedBook;
        console.log(borrowedBook)
        if (borrowedBook.buyerdata) {
          const buyerDataWithStatus = {
            buyerdata: borrowedBook.buyerdata,
            status: borrowedBook.status, 
            borrowed: borrowedBook.borrowed, 
            returned: borrowedBook.returned, 
          };
          filteredData.push(buyerDataWithStatus);
        } else {
          console.error('buyerdata is missing or not an object');
        }
      }
    });
    console.log(filteredData);
        this.dataSource = new MatTableDataSource(filteredData)
    });
  }
 }
   getBorrowBook() {
     this.moduleservice.getborrow(this.BookId).subscribe(res => {
      this.booksinfo = res[this.currentid];
      console.log(res[this.BookId]); 

     })
   }
    back() {
      this.router.navigate(['/management/dashboard/2'])
    }
}
