import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category as Categories, Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategoriesList(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/rt-oscar/category/');
  }
}
