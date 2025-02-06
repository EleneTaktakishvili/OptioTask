import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectAnimals,
  selectLoading,
  selectPigStatus,
} from '../../state/selectors/animal.selectors';
import { Animal, filterData } from '../../models/animal.model';
import { State } from '../../state/reducers/animal.reducers';
import { loadAnimals, feedAnimal } from '../../state/actions/animal.actions';
import { PigStatus } from '../../models/pig-status.model';

@Component({
  selector: 'app-animal-card-container',
  standalone: false,

  templateUrl: './animal-card-container.component.html',
  styleUrl: './animal-card-container.component.css',
})
export class AnimalCardContainerComponent {
  animals$!: Observable<Animal[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(
      loadAnimals({ filter: new filterData('', '', '', 0, 100) }),
    );
    this.animals$ = this.store.select(selectAnimals);
    this.loading$ = this.store.select(selectLoading);
  }

  feedAnimal(id: number) {
    this.store.dispatch(feedAnimal({ id: id }));
  }
}
