import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [ToastrModule, ReactiveFormsModule]
})
export class SharedModule { }
