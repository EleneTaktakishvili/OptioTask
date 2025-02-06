import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalPagingComponent } from './animal-paging.component';

describe('AnimalPagingComponent', () => {
  let component: AnimalPagingComponent;
  let fixture: ComponentFixture<AnimalPagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalPagingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
