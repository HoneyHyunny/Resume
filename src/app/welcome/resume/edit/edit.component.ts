//event Emitter, outputDecorator
import { Component, OnInit } from '@angular/core';

// Board model import
import { Board } from '../../../models/board.model';

//service import 

import { ResumeService } from '../resume.service';

//Reactive Forms 
import {FormGroup, FormControl, Validators} from '@angular/forms'

//activateRouter for edit mode 
import { ActivatedRoute, ParamMap } from '@angular/router'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  //Reacitve Forms 
  boardEditForm : FormGroup; 
  // 나중에 서버에서 로그인 상태가 확인되면 이 기능이 활성화.
  enableAdd: boolean = true;

  //mode setting
  private mode = 'create';
  //boardId for edit
  private boardId : string;

  //새로 수정하는 board, server로부터 값이 넘어오기때문에 일반 선언.
   board : Board 

   // bool status for spinner 
   isLoading = false;

  constructor(private resumeService : ResumeService, public route : ActivatedRoute) {
    
   }

  
  ngOnInit(): void {
    // reactive form init
    this.boardEditForm = new FormGroup({
      mainTitle : new FormControl(null, {
        validators : [Validators.required, Validators.minLength(3)]
      }), 
      extraTitle : new FormControl(null, {
        validators : [Validators.required, Validators.minLength(3)]
      }),
      date : new FormControl(null, {validators : [Validators.required, Validators.minLength(3)]
      }),
      contents : new FormControl(null, {validators : [Validators.required, Validators.minLength(3)]
      }),

    });

    //for editmode
    this.route.paramMap.subscribe((paramMap : ParamMap)=>{
      //만약 보드 아이디가 있다면, 그것은 지금 파라미터를 가지고있다는 뜻으로, 즉 수정모드라는것을 알수 있음 . 
      if(paramMap.has('boardId')){
        this.mode = 'edit';
        //zone 에 존재하는 boardId를 가지고옴.
        this.boardId = paramMap.get('boardId');
        this.isLoading = true;
        this.resumeService.getSingleBoard(this.boardId).subscribe(paramBoard =>{
          this.isLoading = false;

          console.log(paramBoard);
          console.log("edit mode에 진입했습니다.")
          this.board = { 
            id : paramBoard._id, 
            mainTitle : paramBoard.mainTitle,
            extraTitle : paramBoard.extraTitle,
            date : paramBoard.date,
            contents : paramBoard.contents,
            createdBy : paramBoard.createdBy
          }
          
          this.boardEditForm.setValue({
            mainTitle : this.board.mainTitle,
            extraTitle : this.board.extraTitle,
            date : this.board.date,
            contents : this.board.contents,
          });
          console.log( this.board);
        });
      }
      else{
        console.log("create mode에 진입헸습니다.")
        this.mode = 'create';
        this.boardId = null;
      }
    })
  }


  onSubmit(){
    //javascript method . form submit후 refresh를 방지한다
    // e.preventDefault();
    if(this.mode === "create"){
    //new Post creation
    this.board = {
      id : null,
      mainTitle : this.boardEditForm.value.mainTitle,
      extraTitle : this.boardEditForm.value.extraTitle,
      date : this.boardEditForm.value.date,
      contents : this.boardEditForm.value.contents,
      createdBy : null
    }
  
    this.resumeService.addBoard(this.board);

    } else {

      this.board = {
        id : this.boardId,
        mainTitle : this.boardEditForm.value.mainTitle,
        extraTitle : this.boardEditForm.value.extraTitle,
        date : this.boardEditForm.value.date,
        contents : this.boardEditForm.value.contents,
        createdBy : null
      }

      this.resumeService.updateBoard(
        this.boardId,
        this.board
      );
    }

    this.boardEditForm.reset();
  }







}
