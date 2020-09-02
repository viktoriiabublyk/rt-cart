import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flatpages } from '../models/flatpage';

@Injectable({
  providedIn: 'root'
})
export class FlatpagesService {
  constructor(private http: HttpClient) { }
  private apiUrl = '/api';

  getAllPagesList(): Observable<Flatpages[]> {
    const url = `${this.apiUrl}/rt-flatpages`;
    return this.http.get<Flatpages[]>(url);
  }

  getSingleFlatPage(page: string): Observable<Flatpages>  {
    const url = `${this.apiUrl}/rt-flatpages/${page}`;
    return this.http.get<Flatpages>(url);
  }

}
