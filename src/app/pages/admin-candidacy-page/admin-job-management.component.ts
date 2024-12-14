import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { CandidacyService } from '../../services/candidacy.service';
import { MatDialog } from '@angular/material/dialog';
import {FeedbackDialogComponent} from "../../component/feedback-dialog/feedback-dialog.component";

@Component({
  selector: 'app-admin-job-management',
  templateUrl: './admin-job-management.component.html',
  styleUrls: ['./admin-job-management.component.css'],
})
export class AdminJobManagementComponent implements OnInit {
  jobs: any[] = [];
  candidacies: any[] = [];
  isLoadingJobs: boolean = false;
  isLoadingCandidacies: boolean = false;
  selectedJobId: number | null = null;
  adminId: number | null = null;

  displayedColumns: string[] = ['name', 'status', 'additionalInfo', 'feedback', 'action'];

  constructor(
    private jobService: JobService,
    private candidacyService: CandidacyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.adminId = this.getUserIdFromLocalStorage();
    this.loadJobs();
  }

  getUserIdFromLocalStorage(): number | null {
    const adminId = localStorage.getItem('userId');
    return adminId ? parseInt(adminId, 10) : null;
  }

  loadJobs(): void {
    if (this.adminId === null) {
      console.error('Admin ID não encontrado no localStorage');
      return;
    }

    this.isLoadingJobs = true;
    this.jobService.getJobsByAdmin(this.adminId).subscribe(
      (data) => {
        this.jobs = data;
        this.isLoadingJobs = false;
      },
      (error) => {
        console.error('Erro ao carregar vagas:', error);
        this.isLoadingJobs = false;
      }
    );
  }

  loadCandidacies(jobId: number): void {
    this.selectedJobId = jobId;
    this.isLoadingCandidacies = true;
    this.candidacyService.getCandidaciesByJob(jobId).subscribe(
      (data) => {
        this.candidacies = data;
        this.isLoadingCandidacies = false;
      },
      (error) => {
        console.error('Erro ao carregar candidaturas:', error);
        this.isLoadingCandidacies = false;
      }
    );
  }

  getSelectedJobTitle(): string {
    const selectedJob = this.jobs.find((job) => job.id === this.selectedJobId);
    return selectedJob ? selectedJob.title : 'Título não encontrado';
  }


  openFeedbackDialog(candidacy: any): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '400px',
      data: {
        status: candidacy.status,
        feedback: candidacy.feedback,
        newStatus: candidacy.status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCandidacy(candidacy, result.newStatus, result.feedback);
      }
    });
  }

  updateCandidacy(candidacy: any, status: string, feedback: string): void {
    this.candidacyService.updateCandidacyStatus(candidacy.id, status, feedback).subscribe(
      () => {
        alert('Candidatura atualizada com sucesso!');
        this.loadCandidacies(this.selectedJobId!);
      },
      (error) => {
        console.error('Erro ao atualizar candidatura:', error);
      }
    );
  }
}

