import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  currentArticles = [];
  viewArticles = [];
  limit = 10;
  currentPage = 1;
  noOfPages = 0;
  subscription: Subscription;
  constructor(private homeService: HomeService,
    @Inject('Articles') public allArticles: any[],
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllArticles();
    this.homeService.sectionName.subscribe(_response => {
      this.getCurrentSectionArticles(_response);
    })
  }

  getAllArticles() {
    this.subscription = this.homeService.getArticles().subscribe(_response => {
      if (_response.status == 'OK') {
        this.allArticles = _response.results;
      }
    })
  }

  getCurrentSectionArticles(sectionName) {
    this.currentArticles = this.allArticles.filter(x => x.section == sectionName);
    this.noOfPages = Math.floor(this.currentArticles.length / this.limit)
    let remaining = this.currentArticles.length % this.limit
    if (remaining > 0)
      this.noOfPages += 1;
    this.noOfPages = this.noOfPages > 0 ? this.noOfPages : 1;
    this.getViewArticles();
  }

  changePage(direction) {
    if (direction == 'next') {
      this.currentPage += 1;
    } else {
      this.currentPage -= 1;
    }
    this.getViewArticles()
  }

  getViewArticles() {
    let finalIndex = this.limit * this.currentPage;
    let initialIndex = finalIndex - this.limit;
    if (finalIndex > this.currentArticles.length)
      finalIndex = this.currentArticles.length
    this.viewArticles = this.currentArticles.slice(initialIndex, finalIndex);
  }

  openArticle(article) {
    window.open(article.url);
  }

  readLater(article) {
    this.homeService.addToReadLater(article.slug_name).subscribe((_response: any) => {
      if (_response.status) {
        this.toastrService.success('Added to read later');
      } else {
        if (_response.message)
          this.toastrService.error(_response.message);
        else
          this.toastrService.error('Please try again');
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
