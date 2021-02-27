import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public sectionName = new Subject();

  constructor(private http: HttpClient,
    @Inject('Articles') public allArticles) { }

  changeSection(section) {
    this.sectionName.next(section);
  }

  addToReadLater(articleSlugName) {
    const readLaterList = JSON.parse(localStorage.getItem("readLaterList")) || [];
    const index = readLaterList.findIndex(x => x.userId == localStorage.getItem('userId'));
    if (index > -1) {
      let userReadLaterList = readLaterList[index];
      const slugIndex = userReadLaterList.slugNames.findIndex(x => x == articleSlugName)
      if (slugIndex > -1) {
        const response = new Observable(observer => {
          observer.next({ status: false, message: 'Already added' })
        })
        return response;
      } else {
        userReadLaterList.slugNames.push(articleSlugName);
        readLaterList.splice(index, 1);
        readLaterList.push(userReadLaterList);
        localStorage.removeItem('readLaterList');
        localStorage.setItem("readLaterList", JSON.stringify(readLaterList));
        const response = new Observable(observer => {
          observer.next({ status: true })
        })
        return response;
      }
    } else {
      const userReadLaterList = { userId: localStorage.getItem('userId'), slugNames: [articleSlugName] }
      readLaterList.push(userReadLaterList);
      localStorage.removeItem('readLaterList');
      localStorage.setItem("readLaterList", JSON.stringify(readLaterList));
      const response = new Observable(observer => {
        observer.next({ status: true })
      })
      return response;
    }
  }

  removeFromRealLaterList(articleSlugName) {
    const readLaterList = JSON.parse(localStorage.getItem("readLaterList")) || [];
    const index = readLaterList.findIndex(x => x.userId == localStorage.getItem('userId'));
    if (index > -1) {
      let userReadLaterList = readLaterList[index];
      const slugIndex = userReadLaterList.slugNames.findIndex(x => x == articleSlugName)
      if (slugIndex > -1) {
        userReadLaterList.slugNames.splice(slugIndex, 1);
        readLaterList.splice(index, 1);
        readLaterList.push(userReadLaterList);
        localStorage.removeItem('readLaterList');
        localStorage.setItem("readLaterList", JSON.stringify(readLaterList));
        const response = new Observable(observer => {
          observer.next({ status: true })
        })
        return response;
      }
    }
  }

  getAllReadLater() {
    const res = new Observable(obs => {
      this.getArticles().subscribe((_response: any) => {
        this.allArticles = _response.results;
        const readLaterList = JSON.parse(localStorage.getItem("readLaterList")) || [];
        const index = readLaterList.findIndex(x => x.userId == localStorage.getItem('userId'));
        if (index > -1) {
          let userReadLaterList = readLaterList[index];
          const slugNames = userReadLaterList.slugNames || [];
          let articles = this.allArticles.filter(val => slugNames.includes(val.slug_name));
          obs.next({ status: true, articleList: articles })
        } else {
          obs.next({ status: true, articleList: [] })
        }
      })
    })
    return res;
  }


  getSectionList() {
    return this.http.get<any>(`https://api.nytimes.com/svc/news/v3/content/section-list.json`, { params: this.getParams() })
  }

  getArticles() {
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
