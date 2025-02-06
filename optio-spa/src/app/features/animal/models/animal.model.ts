import { PigStatus } from './pig-status.model';

export class Animal {
  _id: number;
  name: string;
  type: string;
  creditCount: number;
  imageUrl: string;
  pigStatus: PigStatus;

  constructor(
    _id: number,
    name: string,
    type: string,
    creditCount: number,
    imageUrl: string,
    pigStatus: PigStatus,
  ) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.creditCount = creditCount;
    this.imageUrl = imageUrl;
    this.pigStatus = pigStatus;
  }
}

export interface PaginatedData {
  items: Animal[];
  totalItems: number;
  pageIndex: number;
  pageSize: number;
}

export class filterData {
  filter?: string;
  sortBy?: string;
  direction?: string;
  pageIndex?: number;
  pageSize?: number;

  constructor(
    filter: string = '',
    sortBy: string = 'name',
    direction: string = 'asc',
    pageIndex: number = 0,
    pageSize: number = 5,
  ) {
    this.filter = filter || '';
    this.sortBy = sortBy || 'name';
    this.direction = direction || 'asc';
    this.pageIndex = pageIndex ?? 0;
    this.pageSize = pageSize ?? 5;
  }
}
