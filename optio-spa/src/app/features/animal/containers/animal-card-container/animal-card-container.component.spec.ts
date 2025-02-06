import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCardContainerComponent } from './animal-card-container.component';

describe('AnimalCardContainerComponent', () => {
  let component: AnimalCardContainerComponent;
  let fixture: ComponentFixture<AnimalCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalCardContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
