import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {Course} from "../../models/course";
import {CalculationService} from "../../services/calculation.service";

interface Day {
  date: Date;
  courses?: string[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);

  activeCourses: Course[] = [];

  plottedCourses: {name: string, color: string, hoursPerWeek: number }[] =
    new Array<{name: string, color: string, hoursPerWeek: number}>();

  calendar: Day[][] = [];

  currentDate = new Date();

  constructor(
    private calculationService: CalculationService
  ) {
  }


  ngOnInit() {
    this.activeCourses = this.data.activeCourses;
    this.generateCalendar();
    this.mapCoursesToCalendar();
  }

  ngOnChanges() {
    this.mapCoursesToCalendar();
  }

  getPlottedCourse(course: string) {
    return this.plottedCourses.find(c => c.name === course);
  }

  // used AI for the general idea, but it got it wrong, so I had to change it
  generateCalendar() {
    const startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    const daysInMonth = endDate.getDate();
    const startDay = startDate.getDay();

    const calendar: Day[][] = [];
    let week: Day[] = [];

    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    // fill in the preceding days of the previous month
    for (let i = startDay; i > 0; i--) {
      const prevDay = new Date(startDate.getTime() - i * millisecondsPerDay);
      week.push({ date: prevDay });
    }

    // fill in the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), i);
      week.push({ date });

      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    const weekLength = week.length;
    // fill in the remaining days of the next month
    for (let i = 1; i <= 7 - weekLength; i++) {
      const nextDay = new Date(endDate.getTime() + i * millisecondsPerDay);
      week.push({ date: nextDay });
    }

    calendar.push(week);
    this.calendar = calendar;
  }

  mapCoursesToCalendar() {
    this.plottedCourses = [];

    this.activeCourses.forEach(course => {
      if (!course.completionDate) { return; }

      if (typeof course.completionDate === 'string') {
        course.completionDate = new Date(course.completionDate);
      }

      this.calendar.forEach(week => {
        week.forEach(day => {
          if (day.date > new Date() && day.date <= (course.completionDate ?? new Date())) {
            day.courses = day.courses || [];
            day.courses.push(course.name);

            const plottedCourse = this.plottedCourses.some((c: any) => c.name === course.name);
            if (!plottedCourse) {
              this.plottedCourses.push({
                name: course.name,
                hoursPerWeek: this.calculationService.getHoursPerWeek(course),
                color: this.calculationService.generateRandomColor()
              });
            }
          }
        });
      });
    });
  }
}