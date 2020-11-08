import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

// reactive forms module 
import {ReactiveFormsModule, FormsModule} from '@angular/forms'

//http 
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ResumeComponent } from './welcome/resume/resume.component';
import { HeaderComponent } from './welcome/header/header.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LoginComponent } from './authentification/login/login.component';
import { EditComponent } from './welcome/resume/edit/edit.component'

//Routing Module
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './authentification/signup/signup.component';
import { AuthInterceptor } from './authentification/auth-interceptor';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error/error-interceptor';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    HeaderComponent,
    AuthentificationComponent,
    LoginComponent,
    EditComponent,
    SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
