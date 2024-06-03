import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegloginModule } from './reglogin/reglogin.module';
import { LibrarymanageModule } from './librarymanage/librarymanage.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RegloginModule,
    LibrarymanageModule
  ]
})
export class ModulesModule { }
