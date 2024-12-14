// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private apiUrl =
    'https://desafio-pacto-vaga-back-production.up.railway.app/api/auth';

  private tokenExpiredNotification: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.checkTokenExpiration();

    setInterval(() => {
      this.checkTokenExpiration();
    }, 5 * 60 * 1000);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(username: string | null | undefined, password: string | null | undefined): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { username, password };

    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }

  public register(data: any): Observable<any> {
    console.log(data);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiUrl}/register`, data, { headers });
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }

  public isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.isTokenExpired(token) : false;
  }

  public getTokenExpiredNotification(): boolean {
    return this.tokenExpiredNotification;
  }

  public checkTokenExpiration(): void {
    if (this.isTokenExpired()) {
      this.tokenExpiredNotification = true;
      this.logout();
    }
  }

  public getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  public hasAuthority(requiredRole: string): boolean {
    const role = this.getUserRole();
    return role === requiredRole;
  }

  public redirectBasedOnAuthority(): string {
    const role = this.getUserRole();

    if (role === 'ADMIN_USER') {
      return 'admin-panel';
    } else if (role === 'DEFAULT_USER') {
      return 'user-panel';
    } else {
      return 'unauthorized';
    }
  }
}
