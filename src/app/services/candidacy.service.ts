import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidacyService {
  private apiUrl = 'http://localhost:8080/api/candidacy';

  constructor(private http: HttpClient) {}

  getCandidaciesByUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  getCandidaciesByAdmin(adminId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/${adminId}`);
  }

  getCandidacies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list`);
  }

  getCandidaciesByJob(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job/${jobId}`);
  }

  applyForJob(userId: number, jobId: number, additionalInfo: string): Observable<any> {
    const candidacy = {
      jobVacancy: { id: jobId },
      user: { id: userId },
      additionalInfo: additionalInfo

    };

    return this.http.post<any>(`${this.apiUrl}/apply`, candidacy);
  }


  updateCandidacyStatus(candidacyId: number, status: string, feedback: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${candidacyId}/status`,
      null,
      {
        params: {
          status,
          feedback,
        },
      }
    );
  }
}
