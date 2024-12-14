import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import {SkillService} from "../../services/skill.service";
import { MatDialog } from '@angular/material/dialog';
import {Router} from "@angular/router";
import {SuccessDialogComponent} from "../../component/success-dialog/success-dialog.component";

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  createdById: number | null = null;
  isLoading: boolean = false;

  job = {
    title: '',
    description: '',
    requiredSkills: [],
    createdById: null as number | null
  };

  getUserIdFromLocalStorage(): number | null {
    const createdById = localStorage.getItem('userId');
    return createdById ? parseInt(createdById, 10) : null;
  }

  skills: any[] = [];
  newSkill = { skillName: '', experienceYears: 0 };
  constructor(
    private jobService: JobService,
    private skillService: SkillService,
    private matDialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loadSkills();
    this.createdById = this.getUserIdFromLocalStorage();
  }

  loadSkills(): void {
    this.skillService.getSkills().subscribe(
      (data) => {
        this.skills = data;
      },
      (error) => {
        console.error('Erro ao carregar habilidades:', error);
      }
    );
  }

  createJob(): void {
    this.job.createdById = this.createdById;;
    this.isLoading = true;
    this.jobService.createJob(this.job).subscribe(
      (response) => {
        this.isLoading = false;
        this.openSuccessDialog();
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao criar vaga', error);
        alert('Erro ao criar vaga!');
      }
    );
  }

  createNewSkill(): void {
    this.isLoading = true;
    this.skillService.createSkill(this.newSkill).subscribe(
      (response) => {
        this.skills.push(response);
        this.isLoading = false;
        this.newSkill = { skillName: '', experienceYears: 0 };
        this.openSkillSuccessDialog();
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao criar habilidade', error);
        alert('Erro ao criar habilidade!');
      }
    );
  }

  openSkillSuccessDialog(): void {
    const dialogRef = this.matDialog.open(SuccessDialogComponent, {
      width: '400px',
      data: {message: 'Habilidade criada com sucesso!'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'no') {
        console.log('Usuário optou por não continuar criando habilidades.');
      }
    });
  }


  openSuccessDialog(): void {
    const dialogRef = this.matDialog.open(SuccessDialogComponent, {
      width: '400px',
      data: { message: 'Vaga criada com sucesso!' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/dashboard']);
    });
  }

}
