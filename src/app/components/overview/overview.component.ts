import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Course} from "../../models/course";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  @Input() courses: Course[] = [];

  @Output() removeCourse = new EventEmitter<any>();

  hoursPerWeek = 0;

  nextCompletionCourse: Course | null = null;

  constructor() {}

  ngOnInit() {
    this.calculateHoursPerDay();
  }

  ngOnChanges() {
    this.calculateHoursPerDay();
  }

  calculateHoursPerDay() {
    if (!this.courses || this.courses.length === 0) {
      this.hoursPerWeek = 0;
      return;
    }

    // ensure all dates are Date objects
    this.courses.forEach(course => {
      if (typeof course.completionDate === 'string') {
        course.completionDate = new Date(course.completionDate);
      }
    });

    // find next upcoming completion date
    this.nextCompletionCourse = this.courses.filter(c => c.completionDate).reduce((prev, current) => {
      return (current.completionDate ?? 0) < (prev.completionDate ?? 0) ? current : prev;
    }, this.courses[0]);

    if (!this.nextCompletionCourse || !this.nextCompletionCourse.completionDate) {
      this.hoursPerWeek = 0;
      return;
    }

    const courseHoursLeft = this.nextCompletionCourse.hours * (1 - (this.nextCompletionCourse.percentageCompleted ?? 0) / 100);

    const completionDate = new Date(this.nextCompletionCourse.completionDate);
    const timeLeft = completionDate.getTime() - new Date().getTime();
    const daysLeft = timeLeft / (1000 * 3600 * 24);

    this.hoursPerWeek = Math.ceil(Math.min(courseHoursLeft / daysLeft * 7, courseHoursLeft));
  }
}