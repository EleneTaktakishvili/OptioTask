import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalContainerComponent } from './containers/animal-container/animal-container.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { AnimalFilterComponent } from './components/animal-filter/animal-filter.component';
import { AnimalPagingComponent } from './components/animal-paging/animal-paging.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalCardContainerComponent } from './containers/animal-card-container/animal-card-container.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AnimalContainerComponent,
    AnimalCardComponent,
    AnimalFilterComponent,
    AnimalPagingComponent,
    AnimalListComponent,
    AnimalCardContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnimalRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
  ],
})
export class AnimalModule {}
