import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Animal, filterData } from '../../models/animal.model';

@Component({
  selector: 'app-animal-list',
  standalone: false,

  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css',
})
export class AnimalListComponent {
  @Input() data!: MatTableDataSource<Animal>;
  @Input() displayedColumns: string[] = [];
  @Input() filter: string = '';

  @Output() sortChange = new EventEmitter<filterData>();

  constructor() {}

  sort(event: Sort) {
    const filter = new filterData(this.filter, event.active, event.direction);
    this.sortChange.emit(filter);
  }
}
