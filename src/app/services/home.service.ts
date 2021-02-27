import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public sectionName = new Subject();

  constructor(private http: HttpClient) { }

  changeSection(section){
    this.sectionName.next(section);
  }

  getSectionList() {
    return this.http.get<any>(`https://api.nytimes.com/svc/news/v3/content/section-list.json`, { params: this.getParams() })
  }

  getArticles(paramData){
    let params = new HttpParams({
      fromObject: {
        'api-key': environment.apiKey,
        'page': '0',
        'limit': '500'
      }
    })
    return this.http.get<any>(`https://api.nytimes.com/svc/news/v3/content/all/all.json`, { params: params })
   
  }

  getParams() {
    return new HttpParams({
      fromObject: {
        'api-key': environment.apiKey
      }
    })
  }

}
