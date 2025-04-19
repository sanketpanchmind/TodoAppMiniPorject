import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { authGuard } from '../../../app/core/guards/auth.guard';


const routes: Routes = [
  { path: '', component: PublicComponent },
  // { path: 'home', loadChildren: () => import('../../modules/beforeLogin/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('../../modules/beforeLogin/login/login.module').then(m => m.LoginModule) },
  { path: 'task-manager', loadChildren: () => import('../../modules/afterLogin/task-manager/task-manager.module').then(m => m.TaskManagerModule), canActivate: [authGuard], },
  { path: 'dashboard', loadChildren: () => import('../../modules/afterLogin/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard], },
  { path: 'goals', loadChildren: () => import('../../modules/afterLogin/goals/goals.module').then(m => m.GoalsModule), canActivate: [authGuard], },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
