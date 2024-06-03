import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin',loadChildren: () => import('./modules/reglogin/reglogin.module').then(m => m.RegloginModule),},
  { path: 'management',loadChildren: () => import('./modules/librarymanage/librarymanage.module').then(m => m.LibrarymanageModule),},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
