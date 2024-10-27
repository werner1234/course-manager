import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseListComponent} from "../course-list/course-list.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CourseListComponent,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}