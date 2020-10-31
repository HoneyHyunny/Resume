import { Component, OnInit, OnDestroy } from '@angular/core';

// Board model import
import { Board } from '../../models/board.model'

//service import 

import { ResumeService } from './resume.service'

//rxjs method 
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, OnDestroy {

  boards : Board[] = [];
  
  private boardsSubscription : Subscription

 


  constructor(private resumeService: ResumeService) { 
    
    }


  ngOnInit(): void {


    
    this.resumeService.getBoards();
    console.log(this.boards);

    this.boardsSubscription = this.resumeService.getBoardUpdatedListener()
                      .subscribe((boards : Board[])=>{
      this.boards = boards;
    });
    
   
  }

  ngOnDestroy(): void {
    this.boardsSubscription.unsubscribe();
  }

  
  onDelete(id : string){
    this.resumeService.deleteBoard(id);

  }




}
