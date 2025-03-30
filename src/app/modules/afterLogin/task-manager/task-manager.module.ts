import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { TaskManagerComponent } from './task-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this


@NgModule({
  declarations: [
    TaskManagerComponent
  ],
  imports: [
    CommonModule,
    TaskManagerRoutingModule,
    HttpClientModule, ReactiveFormsModule,
  ]
})
export class TaskManagerModule { }
