import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchTerm: string = '';
  noResultsFound: boolean = false;
  userId: number | null = null;
  isLoading: boolean = false;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadJobs();
    this.userId = this.getUserIdFromLocalStorage();
  }

  getUserIdFromLocalStorage(): number | null {
    const createdById = localStorage.getItem('userId');
    return createdById ? parseInt(createdById, 10) : null;
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobService.getJobs().subscribe(
      (data) => {
        this.jobs = data;
        this.filteredJobs = data;
        this.noResultsFound = false;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar vagas:', error);
        this.noResultsFound = true;
        this.isLoading = false;
      }
    );
  }

  isAdmin(): boolean {
    return this.authService.hasAuthority('ADMIN_USER');
  }

  searchJobs(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredJobs = this.jobs;
      this.noResultsFound = false;
    } else {
      this.filteredJobs = this.jobs.filter((job) =>
        job.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.noResultsFound = this.filteredJobs.length === 0;
    }
  }

  applyToJob(jobId: number): void {
    alert(`Aplicação enviada para a vaga ${jobId}`);
  }

  openDeleteDialog(jobId: number): void {
    const dialogRef = this.matDialog.open(SuccessDialogComponent, {
      width: '400px',
      data: {message: 'Tem certeza que deseja excluir esta vaga?'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.deleteJob(jobId);
      }
    });
  }

  deleteJob(jobId: number): void {
    const dialogRef = this.matDialog.open(SuccessDialogComponent, {
      width: '400px',
      data: {message: 'Tem certeza que deseja excluir esta vaga?'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.isLoading = true;
        this.jobService.deleteJob(jobId).subscribe(
          () => {
            this.isLoading = false;
            this.loadJobs();  // Recarregar as vagas após a exclusão
          },
          (error) => {
            this.isLoading = false;
            console.error('Erro ao excluir vaga', error);
            alert('Erro ao excluir vaga!');
          }
        );
      }
    });
  }

}
