import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as AnimalActions from '../actions/animal.actions';
import { AnimalService } from '../../services/animal.service';
import { Animal, PaginatedData } from '../../models/animal.model';
import { PigStatus } from '../../models/pig-status.model';

@Injectable()
export class AnimalEffects {
  actions$ = inject(Actions); // Injecting Actions service
  constructor(private animalService: AnimalService) {}

  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.loadAnimals),
      switchMap((action) =>
        this.animalService.getAnimals(action.filter).pipe(
          map((animals) => AnimalActions.loadAnimalsSuccess({ animals })),
          catchError((error) =>
            of(AnimalActions.loadAnimalsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  loadAnimalsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.loadAnimalsSuccess),
      mergeMap((action) => {
        const animals: Animal[] = action.animals.items;
        return this.animalService.getPigStatuses().pipe(
          map((pigStatuses) => {
            const enrichedAnimals = this.enrichAnimalsWithPigStatuses(
              animals,
              pigStatuses,
              action.animals.pageIndex,
              action.animals.pageSize,
            );
            return AnimalActions.loadEnrichedAnimalsSuccess({
              animals: enrichedAnimals,
            });
          }),
          catchError((error) => {
            return of(AnimalActions.loadAnimalsFailure({ error }));
          }),
        );
      }),
    ),
  );

  feedAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.feedAnimal),
      mergeMap((action) =>
        this.animalService.feedAnimal(action.id).pipe(
          map((animal) => AnimalActions.feedAnimalSuccess(animal)),
          catchError((error) => of(AnimalActions.feedAnimalFailure({ error }))),
        ),
      ),
    ),
  );

  feedAnimalSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimalActions.feedAnimalSuccess),
      mergeMap((action) => {
        const animal: Animal = action.animal;
        return this.animalService.getPigStatuses().pipe(
          map((pigStatuses) => {
            const enrichedAnimal = this.enrichAnimalsWithPigStatuses(
              [animal],
              pigStatuses,
            );
            return AnimalActions.loadEnrichedAnimalsSuccess({
              animals: enrichedAnimal,
            });
          }),
          catchError((error) => {
            return of(AnimalActions.feedAnimalFailure({ error }));
          }),
        );
      }),
    ),
  );

  // Helper function to enrich animals with pig statuses
  private enrichAnimalsWithPigStatuses(
    animals: Animal[],
    pigStatuses: PigStatus[],
    pageIndex: number = 1,
    pageSize: number = 5,
  ): PaginatedData {
    const enrichedAnimals = animals.map((animal) => {
      const pigStatus = pigStatuses.find(
        (status) => status._id === animal.creditCount,
      );
      return {
        ...animal,
        pigStatus: pigStatus!,
      };
    });

    return {
      items: enrichedAnimals,
      totalItems: animals.length,
      pageIndex,
      pageSize,
    };
  }
}
