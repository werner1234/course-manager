import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course';
import { CalculationService } from '../../services/calculation.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    MatDialogModule
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  @Input() courses: Course[] = [];

  @Output() removeCourse = new EventEmitter<any>();

  hoursPerWeek = 0;

  maxTotalHoursPerDayForAllCourses = 0;

  nextCompletionCourse: Course | null = null;

  constructor(
    private calculationService: CalculationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getNearestCompletionDateHours();
    this.getTotalHoursPerDayForAllCourses();
  }

  ngOnChanges() {
    this.getNearestCompletionDateHours();
    this.getTotalHoursPerDayForAllCourses();
  }

  getNearestCompletionDateHours() {
    if (!this.courses || this.courses.length === 0) {
      this.hoursPerWeek = 0;
      return;
    }

    // find nearest upcoming completion date
    this.nextCompletionCourse = this.calculationService.getNearestCompletionDateCourse([...this.courses]);

    if (!this.nextCompletionCourse) {
      this.hoursPerWeek = 0;
      return;
    }

    this.hoursPerWeek = this.calculationService.getHoursPerWeek(this.nextCompletionCourse);
  }

  getTotalHoursPerDayForAllCourses() {
    this.maxTotalHoursPerDayForAllCourses = this.calculationService.getMaxHoursPerDay([...this.courses]);
  }

  openCalendar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = 'min(1000px, 100vw)';
    dialogConfig.maxWidth = 'none';
    dialogConfig.data = {
      activeCourses: this.courses
    };

    const dialogRef = this.dialog.open(CalendarComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}