
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';


@NgModule({
    exports : [
        MatButtonModule,
        MatDialogModule,
        MatCardModule
    ]
})
export class AngularMaterialModule{}