import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { AuthentificationService } from 'src/app/authentification/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  constructor(private authService : AuthentificationService) { }


  //header에서 auth상태 점검용 bool
  isUserAuthenticated = false;
  // auth 상태 확인을 위한 subscription
  private authStatusSubscription : Subscription;


  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = 
    this.authService.getAuthStatusListener()
                    .subscribe(isAuthenticated =>{
                      this.isUserAuthenticated = isAuthenticated;
                    });
  }


  ngOnDestroy(): void {

    this.authStatusSubscription.unsubscribe();

  }

  onLogout(){
    this.authService.logout();
  }

}
