import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    DashboardComponent,
    RouterModule,
    DashboardComponent,
    CommonModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'course-manager';
}