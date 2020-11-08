//routing시에 주소창에 바로 injection 하는것을 방지. 
//주소창으로 바로 auth가 필요한 부분을 감시하고, injection 시에 
//authservice 의 boolean 상태를 점검하고, auth가 아니라면 로그인을 유도하는식으로 라우팅을 보내버림.

import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { Observable } from 'rxjs';



@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private authentificationService : AuthentificationService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this.authentificationService.getIsAuth();
        if(!isAuth){
            this.router.navigate(['/login']);

        }
        return isAuth;
    }

}