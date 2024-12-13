import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveUser {
  constructor(private http: HttpClient) {}

  private currentUser: any | null = null;

  getUserObservable(): Observable<any> {
    return of(this.currentUser);
  }

  saveUserOnService(user: any): void {
    this.currentUser = user;
  }

  getUser(): any | null {
    return this.currentUser;
  }

  clearUser(): void {
    this.currentUser = null;
  }

  getUserById(userId: string): Observable<any> {
    const url = `http://localhost:8080/api/user/${userId}`;
    return this.http.get<any>(url);
  }
}
