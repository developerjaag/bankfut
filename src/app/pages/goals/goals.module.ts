import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GoalsPage } from './goals.page';

import * as fromComponents from './components/';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: GoalsPage }]),
  ],
  declarations: [GoalsPage, ...fromComponents.COMPONENTS],
  entryComponents: [
    ...fromComponents.ENTRY_COMPONENTS
  ]
})
export class GoalsPageModule { }
