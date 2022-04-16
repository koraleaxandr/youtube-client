import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthorizeGuard } from './core/guards/authorize.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', canActivate: [AuthorizeGuard], loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule) },
  { path: 'youtube', canActivate: [AuthorizeGuard], loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
