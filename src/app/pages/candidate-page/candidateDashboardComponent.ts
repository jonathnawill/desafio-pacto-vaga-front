import { Component, OnInit } from '@angular/core';
import { CandidacyService } from '../../services/candidacy.service';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: 'candidateDashboardComponent.html',
  styleUrls: ['candidateDashboardComponent.css']
})
export class CandidateDashboardComponent implements OnInit {
  applications: any[] = [];
  userId: number | null = null;

  constructor(private candidacyService: CandidacyService) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();
    if (this.userId) {
      this.loadCandidacies();
    } else {
      console.error('User ID não encontrado');
    }
  }

  getUserIdFromLocalStorage(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  loadCandidacies(): void {
    if (this.userId !== null) {
      this.candidacyService.getCandidaciesByUser(this.userId).subscribe(
        (data) => {
          this.applications = data;
        },
        (error) => {
          console.error('Erro ao carregar candidaturas:', error);
        }
      );
    } else {
      console.error('User ID inválido');
    }
  }
}
