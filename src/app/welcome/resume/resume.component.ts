import { Component, OnInit, OnDestroy } from '@angular/core';

//rxjs method 
import { Subscription } from 'rxjs';


// Board model import
import { Board } from '../../models/board.model';

//service import 

import { ResumeService } from './resume.service';
import { AuthentificationService } from '../../authentification/authentification.service';



@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, OnDestroy {

  boards : Board[] = [];

  isUserAuthenticated = false;
  
  private boardsSubscription : Subscription;

  private authStatusSub : Subscription;
 
  userId: string;

  constructor(private resumeService: ResumeService,
              private authentificationService : AuthentificationService
            ) {}


  ngOnInit(): void {

    
    this.resumeService.getBoards();
   
    this.userId = this.authentificationService.getUserId();


 
    

    this.boardsSubscription = this.resumeService.getBoardUpdatedListener()
                      .subscribe((boards : Board[])=>{
                                  
                      this.boards = boards;
    });

    this.isUserAuthenticated = this.authentificationService.getIsAuth();
    this.authStatusSub = this.authentificationService
                        .getAuthStatusListener()
                        .subscribe(isAuthenticated =>{
                          this.isUserAuthenticated = isAuthenticated;
                          this.userId = this.authentificationService.getUserId();
                          
                        });
  }


  onDelete(id : string){
    this.resumeService.deleteBoard(id);

  }




  ngOnDestroy(): void {
    this.boardsSubscription.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  



}
