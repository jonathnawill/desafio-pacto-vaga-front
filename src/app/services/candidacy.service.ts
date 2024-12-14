import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidacyService {
  private apiUrl = 'http://localhost:8080/api/candidacy/user';

  constructor(private http: HttpClient) {}

  getCandidacies(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
