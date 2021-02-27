import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.css']
})
export class ReadLaterComponent implements OnInit {
  currentArticles = [];
  viewArticles = [];
  limit = 10;
  currentPage = 1;
  noOfPages = 0;
  constructor(private homeService: HomeService,
    private toastrService: ToastrService,
    private changeDet: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllReadLaterList();
  }

  getAllReadLaterList() {
    this.homeService.getAllReadLater().subscribe((_response: any) => {
      if (_response.status) {
        this.currentArticles = _response.articleList;
        this.noOfPages = Math.floor(this.currentArticles.length / this.limit)
        let remaining = this.currentArticles.length % this.limit
        if (remaining > 0)
          this.noOfPages += 1;
        this.noOfPages = this.noOfPages > 0 ? this.noOfPages : 1;
        this.getViewArticles();
      } else {
        if (_response.message)
          this.toastrService.error(_response.message);
        else
          this.toastrService.error('Please try again');
      }
    })
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

  removeReadLater(article) {
    this.homeService.removeFromRealLaterList(article.slug_name).subscribe((_response: any) => {
      if(_response.status){
        const index = this.viewArticles.findIndex(x => x.slug_name == article.slug_name)
        this.viewArticles.splice(index, 1);
        this.toastrService.success('Removed from read later');
        this.changeDet.detectChanges();
      }
    })
  }

}
