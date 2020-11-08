import { Injectable } from '@angular/core';

import { HttpInterceptor,
         HttpRequest, 
         HttpHandler, 
         HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//mat dialog
import { MatDialog } from '@angular/material/dialog'

//service import 
import{ ErrorService } from './error.service';
//dialog import 
import { ErrorComponent } from './error.component';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    

    constructor(private dialog: MatDialog, private errorService: ErrorService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) =>{
                let errorMessage = "Error Occurred";
                if(error.error.message){
                    errorMessage = error.error.message;
                }
                this.dialog.open(ErrorComponent), {data: {message : errorMessage}}

                return throwError(error);
            })
        )
    }

}