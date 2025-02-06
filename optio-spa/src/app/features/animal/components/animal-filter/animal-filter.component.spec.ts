import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFilterComponent } from './animal-filter.component';

describe('AnimalFilterComponent', () => {
  let component: AnimalFilterComponent;
  let fixture: ComponentFixture<AnimalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
