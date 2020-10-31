import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

// reactive forms module 
import {ReactiveFormsModule, FormsModule} from '@angular/forms'

//http 
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ResumeComponent } from './welcome/resume/resume.component';
import { HeaderComponent } from './welcome/header/header.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LoginComponent } from './authentification/login/login.component';
import { EditComponent } from './welcome/resume/edit/edit.component'

//Routing Module
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    HeaderComponent,
    AuthentificationComponent,
    LoginComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
