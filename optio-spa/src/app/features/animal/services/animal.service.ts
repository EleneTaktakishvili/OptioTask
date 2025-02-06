import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal, filterData, PaginatedData } from '../models/animal.model';
import { PigStatus } from '../models/pig-status.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000/api';
  }

  public getAnimals(data: filterData): Observable<PaginatedData> {
    return this.http.get<PaginatedData>(
      `${this.apiUrl}/animals?filter=${data.filter}&sortBy=${data.sortBy}&direction=${data.direction}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`,
    );
  }

  public getPigStatuses(): Observable<PigStatus[]> {
    return this.http.get<PigStatus[]>(`${this.apiUrl}/bidzina/status`);
  }

  public feedAnimal(id: number): Observable<any> {
    return this.http.post<Animal>(`${this.apiUrl}/animals/${id}/feed`, {});
  }
}
