import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { education } from '../model/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  URL = 'http://localhost:8080/education/';

  constructor(private http: HttpClient) { }

  public getEducation(): Observable<education> {
    return this.http.get<education>(this.URL + 'search/1')
  }
}