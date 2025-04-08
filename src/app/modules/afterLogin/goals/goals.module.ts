import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './goals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GoalsComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class GoalsModule { }
