import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseListComponent} from "../course-list/course-list.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CourseListComponent,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}