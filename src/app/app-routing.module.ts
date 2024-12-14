import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-pages/login-pages.component';
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {DashboardPageComponent} from "./pages/dashboard-page/dashboard-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {CandidateDashboardComponent} from "./pages/candidate-page/candidateDashboardComponent";
import {CreateJobComponent} from "./pages/create-job-page/create-job.component";
import {AdminJobManagementComponent} from "./pages/admin-candidacy-page/admin-job-management.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard],},
  { path: 'candidate-dashboard', component: CandidateDashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-job', component: CreateJobComponent, canActivate: [AuthGuard] },
  { path: 'admin/candidacies', component: AdminJobManagementComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
