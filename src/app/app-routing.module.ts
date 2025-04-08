import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './layout/public/public.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: PublicComponent, loadChildren: () => import('./layout/public/public.module').then(m => m.PublicModule) },
  { path: 'goals', loadChildren: () => import('./modules/afterLogin/goals/goals.module').then(m => m.GoalsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
