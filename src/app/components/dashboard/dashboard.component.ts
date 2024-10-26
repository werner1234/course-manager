import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseListComponent} from "../course-list/course-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CourseListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}