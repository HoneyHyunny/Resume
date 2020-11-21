import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthentificationService } from '../authentification.service'


//import {environment } from '../../../environments/environment';
import {environment } from '../../../environments/environment.prod';

const envSecret = environment.loginsecret


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {

  isLoading = true;

  userSignupForm : FormGroup;

  

  constructor(private authentificationService : AuthentificationService) { }

  ngOnInit(): void {


    this.userSignupForm = new FormGroup({
      email : new FormControl('', [
        Validators.required,
        Validators.email
      ]) ,
      username : new FormControl('', [
        Validators.required
      ]),
      password : new FormControl(''),
      secretcode : new FormControl('', [
        Validators.required,
        
      ])
    });
  
    this.isLoading = false
  }



  onSubmit(){
    
    console.log(this.userSignupForm.value);
    const user = {
      id : null,
      email : this.userSignupForm.value.email,
      username : this.userSignupForm.value.username,
      password : this.userSignupForm.value.password
    }


    if(this.userSignupForm.value.secretcode == envSecret){

      this.authentificationService.signup(user);
    }
    else { 
      console.error("error");
    }

  }

}
