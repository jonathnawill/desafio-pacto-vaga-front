import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }
  isAdmin(): boolean {
    if (this.authService.hasAuthority('ADMIN_USER')) {
      return true;
    } else {
      return false;
    }
  }
  navigateToCreateJob(route: string): void {
    this.router.navigate([route]);
  }
}
