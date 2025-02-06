import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { animalReducer } from './features/animal/state/reducers/animal.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AnimalEffects } from './features/animal/state/effects/animal.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    EffectsModule.forRoot([AnimalEffects]),
    StoreModule.forRoot({ animals: animalReducer }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retain last 25 states
      //logOnly: environment.production, // Only log in production mode
    }),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
