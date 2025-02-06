import { createReducer, on } from '@ngrx/store';
import * as AnimalActions from '../actions/animal.actions';
import { Animal } from '../../models/animal.model';
import { PigStatus } from '../../models/pig-status.model';

export interface State {
  animals: Animal[];
  filter: string;
  sortBy: string;
  direction: string;
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  pigStatus: PigStatus;
  updatedAnimal: Animal;
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  animals: [],
  filter: '',
  sortBy: 'name',
  direction: 'asc',
  pageIndex: 0,
  pageSize: 5,
  totalItems: 0,
  pigStatus: <PigStatus>{},
  updatedAnimal: <Animal>{},
  loading: false,
  error: null,
};

export const animalReducer = createReducer(
  initialState,
  on(AnimalActions.loadAnimals, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AnimalActions.loadAnimalsSuccess, (state, { animals }) => ({
    ...state,
    loading: false,
    animals: animals.items,
    totalItems: animals.totalItems,
    error: null,
  })),
  on(AnimalActions.setPage, (state, { pageIndex, pageSize }) => ({
    ...state,
    pageIndex,
    pageSize,
  })),
  on(AnimalActions.setSort, (state, { sortBy, direction }) => ({
    ...state,
    sortBy,
    direction,
    pageIndex: 0,
  })),
  on(AnimalActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),
  on(AnimalActions.loadEnrichedAnimalsSuccess, (state, { animals }) => {
    console.log(state.updatedAnimal)
   return {
    ...state,
    loading: false,
    animals: state.animals.some((item) => item._id === state.updatedAnimal._id)
      ? state.animals.map((item) =>
          item._id === state.updatedAnimal._id
            ? { ...item, ...state.updatedAnimal }
            : item,
        )
      : animals.items, // If no match is found, replace with animals.items
    error: null,
  }
}),
  on(AnimalActions.loadAnimalsFailure, (state, { error }) => ({
    ...state,
    loading: true,
    error,
  })),
  on(AnimalActions.feedAnimal, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AnimalActions.feedAnimalSuccess, (state, { animal }) => ({
    ...state,
    loading: false,
    updatedAnimal: animal,
    error: null,
  })),
  on(AnimalActions.feedAnimalFailure, (state, { error }) => ({
    ...state,
    loading: true,
    error,
  })),
);
