//routing module
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

//component Import 
import { ResumeComponent } from './welcome/resume/resume.component';
import { EditComponent } from './welcome/resume/edit/edit.component';
import { LoginComponent } from './authentification/login/login.component';
import { SignupComponent } from './authentification/signup/signup.component';

//authGuard 
import { AuthGuard } from "./authentification/auth.gurad";


const routes : Routes = [
    { path: '', component : ResumeComponent },
    { path: 'create', component: EditComponent, canActivate: [AuthGuard]},
    { path: 'edit/:boardId', component: EditComponent, canActivate : [AuthGuard]}, 
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {};