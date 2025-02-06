import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filterData } from '../../models/animal.model';

@Component({
  selector: 'app-animal-paging',
  standalone: false,

  templateUrl: './animal-paging.component.html',
  styleUrl: './animal-paging.component.css',
})
export class AnimalPagingComponent {
  @Input() totalRecords: number = 0;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 5;
  @Input() filter: string = '';
  @Input() sort: any;

  @Output() pageChange = new EventEmitter<filterData>();

  onPaginatorChange(event: PageEvent) {
    const filter = new filterData(
      this.filter,
      this.sort.sortBy,
      this.sort.direction,
      event.pageIndex,
      event.pageSize,
    );
    this.pageChange.emit(filter);
  }
}
