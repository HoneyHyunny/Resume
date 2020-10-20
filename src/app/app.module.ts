import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResumeComponent } from './welcome/resume/resume.component';
import { HeaderComponent } from './welcome/header/header.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LoginComponent } from './authentification/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    HeaderComponent,
    AuthentificationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
