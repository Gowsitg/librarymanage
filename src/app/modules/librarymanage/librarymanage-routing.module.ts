import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/authguard/auth.guard';
import { BorrowdetailsComponent } from './borrowdetails/borrowdetails.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
    },
  {
    path:'dashboard/:status',
    component: DashboardComponent,
    canActivate: [AuthGuard]
    },
  {
    path:'viewdetails',
    component: BorrowdetailsComponent,
    canActivate: [AuthGuard]
    },
  {
    path:'viewdetails/:id',
    component: BorrowdetailsComponent,
    canActivate: [AuthGuard]
    },
  {
    path:'viewdetails/:id/:currentid',
    component: BorrowdetailsComponent,
    canActivate: [AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrarymanageRoutingModule { }
