import { Injectable } from '@angular/core';

import { Subject } from 'rxjs'; 


@Injectable({ providedIn: 'root' })

export class ErrorService { 
    //error 의 상태를 감지할 subject 설정. error 가 string type으로 리턴되기 때문. 
    private errorListener = new Subject<string>();


    getErrorListener(){
        return this.errorListener.asObservable();
    }

    //넘어온 에러를 datastream에 뿌림. 

    throwError(message : string ){
        this.errorListener.next(message);
    }

    handleError(){
        this.errorListener.next(null);
    }
}

