import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/job';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list`);
  }

  getJobsByAdmin(adminId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/list/${adminId}`);
  }

  createJob(job: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, job);
  }

  deleteJob(jobId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${jobId}`);
  }

}
