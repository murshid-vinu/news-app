import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BaseComponent } from './components/pages/base/base.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HeaderComponent } from './components/partials/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { allArticles } from './core/global';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,
    { provide: 'Articles', useValue: allArticles }],
  bootstrap: [AppComponent]
})
export class AppModule { }
