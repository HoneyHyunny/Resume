import { NgModule } from "@angular/core";
import { ResumeComponent } from './resume.component';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [ ResumeComponent, EditComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        AngularMaterialModule, 
        RouterModule
    ]
})
export class ResumeModule{}