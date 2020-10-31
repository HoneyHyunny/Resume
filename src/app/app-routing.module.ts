//routing module
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

//component Import 
import { ResumeComponent } from './welcome/resume/resume.component';
import { EditComponent } from './welcome/resume/edit/edit.component';
import { LoginComponent } from './authentification/login/login.component';


const routes : Routes = [
    { path: '', component : ResumeComponent },
    { path: 'edit/:boardId', component: EditComponent}, 
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {};