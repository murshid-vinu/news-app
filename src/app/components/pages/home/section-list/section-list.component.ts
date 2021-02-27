import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  totalSections = [];
  subscription: Subscription;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getSections();
  }

  getSections(){
    this.subscription = this.homeService.getSectionList().subscribe(_response=>{
      if(_response.status == 'OK'){
        this.totalSections = _response.results;
      }
    })
  }

  selectSection(section){
    this.homeService.changeSection(section.display_name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
