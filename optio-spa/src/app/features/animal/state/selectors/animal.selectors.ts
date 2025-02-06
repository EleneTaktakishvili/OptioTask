import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/animal.reducers';

const getAnimalState = createFeatureSelector<State>('animals');

export const selectAnimals = createSelector(
  getAnimalState,
  (state: State) => state.animals ?? [],
);
export const selectLoading = createSelector(
  getAnimalState,
  (state: State) => state.loading,
);

export const selectTableError = createSelector(
  getAnimalState,
  (state: State) => state.error,
);
export const selectTotalItems = createSelector(
  getAnimalState,
  (state: State) => state.totalItems,
);

export const selectPageIndex = createSelector(
  getAnimalState,
  (state: State) => state.pageIndex,
);

export const selectPageSize = createSelector(
  getAnimalState,
  (state: State) => state.pageSize,
);

export const selectSort = createSelector(getAnimalState, (state: State) => ({
  sortBy: state.sortBy,
  direction: state.direction,
}));

export const selectFilter = createSelector(
  getAnimalState,
  (state: State) => state.filter,
);

export const selectPigStatus = createSelector(
  getAnimalState,
  (state: State) => state.pigStatus,
);
