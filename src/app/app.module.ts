import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './component/login/login.component';
import { LoginPageComponent } from './pages/login-pages/login-pages.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterSuccessDialogComponent } from './component/register-success-dialog/register-success-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {RegisterComponent} from "./component/register/register.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { FooterInfoComponent } from './component/footer-info/footer-info.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DashboardPageComponent} from "./pages/dashboard-page/dashboard-page.component";
import {ScrollToTopComponent} from "./component/scroll-to-top/scroll-to-top.component";
import {SidebarComponent} from "./component/sidebar/sidebar.component";
import {TopbarComponent} from "./component/topbar/topbar.component";
import {LogoutDialogComponent} from "./component/logout-dialog/logout-dialog.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatChipsModule} from "@angular/material/chips";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RegisterSuccessDialogComponent,
    RegisterComponent,
    FooterInfoComponent,
    DashboardPageComponent,
    ScrollToTopComponent,
    SidebarComponent,
    TopbarComponent,
    LogoutDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatChipsModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
