import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  updateDisplayName(userData) {
    const userDetailsList = JSON.parse(localStorage.getItem("userRegisterDetails")) || [];
    const index = userDetailsList.findIndex(x => x.id == userData.userId);
    if (index > -1) {
      userDetailsList[index].displayName = userData.displayName;
      localStorage.removeItem('userRegisterDetails');
      localStorage.setItem("userRegisterDetails", JSON.stringify(userDetailsList));
      const response = new Observable(observer => {
        observer.next({ status: true })
      })
      return response;
    } else {
      const response = new Observable(observer => {
        observer.next({ status: false, message: 'No such user' })
      })
      return response;
    }
  }

  changePassword(passwordData) {
    const userDetailsList = JSON.parse(localStorage.getItem("userRegisterDetails")) || [];
    const index = userDetailsList.findIndex(x => x.id == passwordData.userId);
    if (index > -1) {
      let user = userDetailsList[index];
      if (user.password == passwordData.oldPassword) {
        user.password = passwordData.password;
        localStorage.removeItem('userRegisterDetails');
        localStorage.setItem("userRegisterDetails", JSON.stringify(userDetailsList));
        const response = new Observable(observer => {
          observer.next({ status: true })
        })
        return response;
      } else {
        const response = new Observable(observer => {
          observer.next({ status: false, message: 'Incorrect old password' })
        })
        return response;
      }
    } else {
      const response = new Observable(observer => {
        observer.next({ status: false, message: 'No such user' })
      })
      return response;
    }
  }

  deleteAccount(userId) {
    let userDetailsList = JSON.parse(localStorage.getItem("userRegisterDetails")) || [];
    const index = userDetailsList.findIndex(x => x.id == userId);
    if (index > -1) {
      debugger;
      userDetailsList.splice(index, 1)
      localStorage.removeItem('userRegisterDetails');
      localStorage.setItem("userRegisterDetails", JSON.stringify(userDetailsList));
      const response = new Observable(observer => {
        observer.next({ status: true })
      })
      return response;
    }else{
      const response = new Observable(observer => {
        observer.next({ status: false, message: 'No such user' })
      })
      return response;
    }
  }

}
