import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewerComponent } from './viewer.component';

const appRoutes: Routes = [
  {
    path: ':id',
    component: ViewerComponent
  },
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ViewerRoutingModule {}
