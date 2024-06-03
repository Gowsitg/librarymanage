import { NgModule } from '@angular/core';
import { CommonModule,NgIf, NgFor } from '@angular/common';

import { LibrarymanageRoutingModule } from './librarymanage-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material-modules';
import { AddbookdetailsComponent } from './addbookdetails/addbookdetails.component';
import { BorrowdetailsComponent } from './borrowdetails/borrowdetails.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    DashboardComponent,
    AddbookdetailsComponent,
    BorrowdetailsComponent
  ],
  imports: [
    CommonModule,
    LibrarymanageRoutingModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [ToastrService],
    
})
export class LibrarymanageModule { }
