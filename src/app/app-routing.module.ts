//routing module
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

//component Import 
import { ResumeComponent } from './welcome/resume/resume.component';
import { EditComponent } from './welcome/resume/edit/edit.component';

//authGuard 
import { AuthGuard } from "./authentification/auth.gurad";


const routes : Routes = [
    { path: '', component : ResumeComponent },
    { path: 'create', component: EditComponent, canActivate: [AuthGuard]},
    { path: 'edit/:boardId', component: EditComponent, canActivate : [AuthGuard]}, 
    { path: "auth", loadChildren: () => import('./authentification/auth.module').then(m => m.AuthModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {};