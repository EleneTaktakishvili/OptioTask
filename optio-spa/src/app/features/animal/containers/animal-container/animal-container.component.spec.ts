import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalContainerComponent } from './animal-container.component';

describe('AnimalContainerComponent', () => {
  let component: AnimalContainerComponent;
  let fixture: ComponentFixture<AnimalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
