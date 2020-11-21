import { Component, OnInit } from '@angular/core';
//Reactive forms module
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';

//user moeld 
import { User } from '../../models/user.model';

import { AuthentificationService } from '../authentification.service';

// import { environment } from '../../../environments/environment';
import {environment } from '../../../environments/environment.prod';

const envSecret = environment.loginsecret


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {

  isLoading = true;

  userLoginForm : FormGroup;

  constructor(private authentificationService : AuthentificationService) { }

  ngOnInit(): void {


    this.userLoginForm = new FormGroup({
      email : new FormControl(''),
      password : new FormControl(''),
      secretcode : new FormControl('')
    });
  
    this.isLoading = false
  }



  onSubmit(){
    console.log(this.userLoginForm.value);

    const user : User ={
    
      email : this.userLoginForm.value.email,
      password : this.userLoginForm.value.password,
 
    }
    
    if(this.userLoginForm.value.secretcode == envSecret){

     
    this.authentificationService.login(user);
    }
    else { 
      console.error("error");
    }

  }


}
