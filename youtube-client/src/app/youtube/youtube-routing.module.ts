import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchItemComponent } from './pages/search-item/search-item.component';
import { NotFoundComponent } from '../core/components/not-found/not-found.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const youtubeRoutes: Routes = [
  { path: '', component: SearchResultsComponent },
  { path: 'search', component: SearchResultsComponent, pathMatch: 'full' },
  { path: 'main', component: SearchResultsComponent, pathMatch: 'full' },
  { path: 'detailed-information/:id', component: SearchItemComponent, pathMatch: 'full' },
  { path: 'admin-page', component: AdminPageComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(youtubeRoutes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule { }
