import { createAction, props } from '@ngrx/store';
import { Animal, filterData, PaginatedData } from '../../models/animal.model';

export const loadAnimals = createAction(
  '[Animal List] Load Animals',
  props<{ filter: filterData }>(),
);

export const loadAnimalsSuccess = createAction(
  '[Animal List] Load Animals Success',
  props<{ animals: PaginatedData }>(),
);

export const loadEnrichedAnimalsSuccess = createAction(
  '[Animal List] Load Enriched Animals Success',
  props<{ animals: PaginatedData }>(),
);

export const loadAnimalsFailure = createAction(
  '[Animal List] Load Animals Failure',
  props<{ error: string }>(),
);

export const setPage = createAction(
  '[Animal List] Set Page',
  props<{ pageIndex: number; pageSize: number }>(),
);
export const setSort = createAction(
  '[Animal List] Set Sort',
  props<{ sortBy: string; direction: string }>(),
);
export const setFilter = createAction(
  '[Animal List] Set Filter',
  props<{ filter: string }>(),
);

export const feedAnimal = createAction(
  '[Animal List] Feed Animal',
  props<{ id: number }>(),
);
export const feedAnimalSuccess = createAction(
  '[Animal List] Feed Animal Success',
  props<{ animal: Animal }>(),
);
export const feedAnimalFailure = createAction(
  '[Animal List] Feed Animal Failure',
  props<{ error: string }>(),
);
