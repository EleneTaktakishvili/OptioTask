import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { filterData } from '../../models/animal.model';

@Component({
  selector: 'app-animal-filter',
  standalone: false,

  templateUrl: './animal-filter.component.html',
  styleUrl: './animal-filter.component.css',
})
export class AnimalFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<filterData>();
  filterControl = new FormControl();

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        const filter = new filterData(value);
        this.filterChange.emit(filter);
      });
  }
}
