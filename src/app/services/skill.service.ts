import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'https://desafio-pacto-vaga-back-production.up.railway.app/api/skill';

  constructor(private http: HttpClient) {}

  getSkills(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list`);
  }


  createSkill(skill: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, skill);
  }
}
