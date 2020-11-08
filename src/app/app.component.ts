import { Component, OnInit } from '@angular/core';

import { AuthentificationService } from './authentification/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService){

  }
  ngOnInit(){
    this.authentificationService.autoAuthUser();
  }
  title = 'resumeProject';
}
