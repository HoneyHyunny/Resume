import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
//import { environment } from '../../environments/environment'


import {environment} from '../../environments/environment.prod'



const httpAddr = environment.globalUrl +"/user";


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  //global constant for addr

  //server로 부터 리턴받을 토큰
  private token : string;

  //서버로부터 토큰을 리턴받고 로컬에서 토큰의 유지시간. 
  private tokenTimer: any;

  //로컬에서 auth 상태를 체크하기위한 bool status  init value = false;
  //유저가 로그인시 true;
  private isAuthenticated = false; 

  //userId for editpost 
  private userId : string;
  
  //local에서 라우팅시 auth가 필요한 부분을 체크하기위한 authstatuss subject; 
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  //token을 받는 getter
  getToken(){
    return this.token;
  }
  
  //auth check가 필요한 부분에서 상태를 알기위한 getter
  getIsAuth(){
    return this.isAuthenticated
  }

  getUserId(){
    return this.userId;
  }

  //observable auth status
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }



  signup(newUser : User){

    const user  = newUser; 

    this.http.post(httpAddr + "/signup", user)
             .subscribe(response =>{
               console.log(response);
             });
  }

  login(existUSer : User){
    const user = existUSer; 
    // < generics, value from res by server >
    this.http.post<{token: string, expiresIn: number, userId: string }>(httpAddr + "/login", user)
             .subscribe(response =>{
               const token = response.token;
               this.token = token;
               if(token){
                 //response로 받은 token timer
                 console.log(response.expiresIn);
                 const expriesInDuration = response.expiresIn;
                 
                 this.setAuthTimer(expriesInDuration);

                 this.isAuthenticated = true;
                 this.userId = response.userId;
                 this.authStatusListener.next(true);
                 const now = new Date();
                 //서버로부터 토큰을 받은 시간부터 한시간의 시간 상수 설정.
                 const expirationDate = new Date(now.getTime() + expriesInDuration * 1000);
                 console.log(expirationDate);
                 this.saveAuthData(token, expirationDate, this.userId);
                 this.router.navigate(["/"]);    
               }
             });
  }

  logout(){
    this.token = null; 
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0 ){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }


  private setAuthTimer(duration: number){
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() =>{
      this.logout();
    }, duration * 1000);
  }

  //local storage에 토큰과 설정한 시간을 넣는 함수.
  private saveAuthData(token: string, expirationDate : Date, userId : string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId)

  }
  //local storage에 있는 토큰과 시간을 날리는 함수. logout시 발동함.
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  //local storage 에 저장된 데이터를 불러오는 함수. 
  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate){
      return;
    }

    return {
      token: token,
      expirationDate : new Date(expirationDate),
      userId : userId
    }

  }



}
