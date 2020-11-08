import { Injectable } from '@angular/core';

//rxjs
import { Subject } from 'rxjs';

//map operators 

import { map } from 'rxjs/operators';

//http module

import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

//model import
import { Board } from '../../models/board.model';

//envrionment var
import { environment } from '../../../environments/environment'

//common http addr
const addr = environment.localURL + "/resume/boards";


@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  //boards arr init
  private boards : Board[] = [];

  //subject 
  private updatedBoards = new Subject<Board[]>();

  

  constructor(private http : HttpClient, private router : Router) {

   }


  
  getBoardUpdatedListener(){
    return this.updatedBoards.asObservable();
  }
 

  //get all boards list when client access to the homepage. 
  getBoards(){
    this.http.get<{message: string, body: any}>(addr)
             .pipe(map((result)=>{
               return result.body.map(board =>{
                 return{
                    id : board._id,
                    mainTitle : board.mainTitle,
                    extraTitle : board.extraTitle,
                    date : board.date, 
                    contents : board.contents,
                    createdBy : board.createdBy          
                 }
               });
             }))
             .subscribe((mappedData)=>{
              console.log(mappedData);
              //if success 
              this.boards = mappedData;
              
              console.log(this.boards);

              //subject next()
              this.updatedBoards.next([...this.boards])
             });     
  }


  addBoard(board : Board){
    // db 정보를 저장한뒤 성공적으로 저장하게 되면 리턴값은 몽고디비에 저장된 id 값만을 가지고 온다. 
    // 따라서 많은 양의 데이터가 필요없고 우리는 프론트엔드 로컬에서만 존재하는 board에 서버로부터 가지고 온 id값만을 더하여 로컬에서 사용하게 함. 

    this.http.post<{message : string, boardId : string}>(addr, board)  
             .subscribe((res)=>{
                
                console.log(res);
                const boardId = res.boardId;
                board.id = boardId;
                this.boards.push(board);
                this.updatedBoards.next([...this.boards]);
             })

  }

  deleteBoard(id : string){
    console.log(addr + '/' + id);
    this.http.delete<{message : string}>(addr + '/' + id)
             .subscribe(()=>{

               const afterDeleteBoards = this.boards.filter(board => board.id !== id);
               this.boards = afterDeleteBoards;
               this.updatedBoards.next([...this.boards]);
             });

  }

  //for edit mode, returning id string.
  getSingleBoard(id: string){
    //prevent duplicatation of original. 
    return this.http.get<{_id: string, mainTitle: string, extraTitle: string, date: string, contents : string, createdBy: string}>
                        (addr + '/' + id)
  }

  updateBoard(id : string, board : Board){
    this.http.put(addr + "/" + id, board)
             .subscribe(editResponse =>{
               //edit 성공후 리스폰스가 오면 그뒤 보드 업데이트. 
               const updatedBoards = [...this.boards];
               //findIndex method for find old board index
               const oldboardIndex = updatedBoards.findIndex(i => i.id === board.id);
               //edit-form 으로부터 넘어온 수정된 내용을 기존에 내용을갖고있는 인덱스에 추가.
               updatedBoards[oldboardIndex] = board;
               this.boards = updatedBoards;
               this.updatedBoards.next([...this.boards]);
               //그후 라우터 네비게이션으로 홈으로 이동. 
               this.router.navigate(["/"]);
             });
  }






}
