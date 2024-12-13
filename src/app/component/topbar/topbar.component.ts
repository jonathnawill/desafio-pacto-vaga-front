// topbar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  user: any;

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userName = localStorage.getItem('username');
    console.log(userName);
    if (userName) {
      this.user = {
        username: userName
      };
    }
  }


  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profile']);
  }
}
