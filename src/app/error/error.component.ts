import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog'

//subscription import 
import { Subscription } from 'rxjs';

//error service import 

import { ErrorService } from './error.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
 
})
export class ErrorComponent {
  
  //error
  // errordata : { message: string};
  // private errorSubscription : Subscription;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string } ) { }


  // ngOnInit(): void {

    // this.errorSubscription = this.errorService.getErrorListener()
    //                         .subscribe(errorMessage =>{
    //                           this.errordata = {message : errorMessage};
    //                         });

  // }

  // onHandleError(){
  //   this.errorService.handleError();
  // }

  // ngOnDestroy(): void { 
  //   this.errorSubscription.unsubscribe();
  // }
  
}
