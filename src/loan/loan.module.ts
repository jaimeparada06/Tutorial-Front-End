import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanEditComponent } from './loan-edit/loan-edit.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';






@NgModule({
  declarations: [
    LoanListComponent,
    LoanEditComponent
  ],
  imports: [
      CommonModule,
      MatTableModule,
      MatIconModule, 
      MatButtonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatOptionModule,
      MatSelectModule,
      MatCardModule,
      MatDatepickerModule
  ],
  providers: [
      {
          provide: MAT_DIALOG_DATA,
          useValue: {},
      },
      // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      // { provide: MAT_DATE_FORMATS, useValue: DateFormats }
  ]
  })
export class LoanModule { }
