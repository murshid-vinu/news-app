import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  totalArticles = [];
  currentArticles = [];
  viewArticles = [];
  limit = 10;
  currentPage = 1;
  noOfPages = 0;
  subscription: Subscription;
  constructor(private homeService: HomeService,
    @Inject('Articles') public allArticles: any[]) { }

  ngOnInit(): void {
    this.getAllArticles();
    this.homeService.sectionName.subscribe(_response => {
      this.getCurrentSectionArticles(_response);
    })
  }

  getAllArticles() {
    this.subscription = this.homeService.getArticles({ page: this.currentPage }).subscribe(_response => {
      if (_response.status == 'OK') {
        this.totalArticles = _response.results;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
