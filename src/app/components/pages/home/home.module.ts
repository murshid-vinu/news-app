import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SectionListComponent } from './section-list/section-list.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeService } from '../../../services/home.service';

@NgModule({
  declarations: [HomeComponent, SectionListComponent, ArticlesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [HomeService]
})
export class HomeModule { }
