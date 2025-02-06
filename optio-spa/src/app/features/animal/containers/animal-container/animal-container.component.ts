import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import {
  selectAnimals,
  selectFilter,
  selectLoading,
  selectPageIndex,
  selectPageSize,
  selectSort,
  selectTotalItems,
} from '../../state/selectors/animal.selectors';
import { Store } from '@ngrx/store';
import {
  loadAnimals,
  setFilter,
  setPage,
  setSort,
} from '../../state/actions/animal.actions';
import { MatTableDataSource } from '@angular/material/table';
import { Animal, filterData } from '../../models/animal.model';

@Component({
  selector: 'app-animal-container',
  standalone: false,
  templateUrl: './animal-container.component.html',
  styleUrl: './animal-container.component.css',
})
export class AnimalContainerComponent implements OnInit, OnDestroy {
  private animalsSubscription!: Subscription;
  displayedColumns: string[] = ['imageUrl', 'name', 'type', 'creditCount'];
  dataSource = new MatTableDataSource<Animal>();
  total$!: Observable<number>;
  filter$!: Observable<string>;
  sort$!: Observable<any>;
  pageIndex$!: Observable<number>;
  pageSize$!: Observable<number>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAnimals({ filter: new filterData() }));
    this.loading$ = this.store.select(selectLoading);
    this.total$ = this.store.select(selectTotalItems);
    this.sort$ = this.store.select(selectSort);
    this.filter$ = this.store.select(selectFilter);
    this.pageIndex$ = this.store.select(selectPageIndex);
    this.pageSize$ = this.store.select(selectPageSize);

    this.animalsSubscription = this.store
      .select(selectAnimals)
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  onPageChange(value: filterData) {
    this.store.dispatch(
      setPage({ pageIndex: value.pageIndex!, pageSize: value.pageSize! }),
    );
    this.store.dispatch(loadAnimals({ filter: value }));
  }

  onSortChange(value: filterData) {
    this.store.dispatch(
      setSort({ sortBy: value.sortBy!, direction: value.direction! }),
    );
    this.store.dispatch(loadAnimals({ filter: value }));
  }

  onFilterChange(value: filterData) {
    this.store.dispatch(setFilter({ filter: value.filter! }));
    this.store.dispatch(
      setPage({ pageIndex: value.pageIndex!, pageSize: value.pageSize! }),
    );
    this.store.dispatch(loadAnimals({ filter: value }));
  }

  ngOnDestroy() {
    if (this.animalsSubscription) {
      this.animalsSubscription.unsubscribe();
    }
  }
}
