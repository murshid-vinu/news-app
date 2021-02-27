import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  userLogin(userData) {
    const userDetailsList = JSON.parse(localStorage.getItem("userRegisterDetails")) || [];
    const index = userDetailsList.findIndex(x => (x.email == userData.email && x.password == userData.password))
    if (index > -1) {
      const response = new Observable(observer => {
        observer.next({ status: true, displayName: userDetailsList[index].displayName, userId: userDetailsList[index].id })
      })
      return response;
    } else {
      const response = new Observable(observer => {
        observer.next({ status: false })
      })
      return response;
    }

  }

  userRegistration(userData) {
    const userDetailsList = JSON.parse(localStorage.getItem("userRegisterDetails")) || [];
    const index = userDetailsList.findIndex(x => x.email == userData.email)
    if (index > -1) {
      const response = new Observable(observer => {
        observer.next({ status: false })
      })
      return response;
    } else {
      if (userDetailsList.length > 0) {
        let id = userDetailsList[userDetailsList.length - 1].id;
        id += 1;
        userData.id = id;
      } else {
        userData.id = 1;
      }
      userDetailsList.push(userData);
      localStorage.setItem("userRegisterDetails", JSON.stringify(userDetailsList));
      const response = new Observable(observer => {
        observer.next({ status: true })
      })
      return response;
    }
  }

  userEmailCheck(email) {
    const userDetailsList = JSON.parse(localStorage.getItem("userRegisterDetails")) || [];
    const index = userDetailsList.findIndex(x => x.email == email);
    const response = new Observable(observer => {
      index > -1 ? observer.next({ status: false }) : observer.next({ status: true })
    })
    return response;
  }

}
