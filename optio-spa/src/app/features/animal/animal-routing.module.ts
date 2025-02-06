import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalContainerComponent } from './containers/animal-container/animal-container.component';
import { AnimalCardContainerComponent } from './containers/animal-card-container/animal-card-container.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AnimalContainerComponent, pathMatch: 'full' },
      { path: 'list', component: AnimalContainerComponent, pathMatch: 'full' },
      {
        path: 'feed',
        component: AnimalCardContainerComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalRoutingModule {}
