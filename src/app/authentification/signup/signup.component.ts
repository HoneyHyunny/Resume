import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthentificationService } from '../authentification.service'

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
      email : new FormControl(''),
      username : new FormControl(''),
      password : new FormControl('')
    });
  
    this.isLoading = false
  }



  onSubmit(){
    console.log(this.userSignupForm.value);
    const user = {
      id : null,
      email : this.userSignupForm.value.email,
      username : this.userSignupForm.value.username,
      password : this.userSignupForm.value.password,
    }
    this.authentificationService.signup(user);
  }

}
