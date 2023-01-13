import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'viewer',
    loadChildren: () =>
      import('./viewer/viewer.module').then((m) => m.ViewerModule),
  },
  {
    path: '',
    redirectTo: 'viewer',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
