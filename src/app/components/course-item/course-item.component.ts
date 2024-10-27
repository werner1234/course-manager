import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course} from "../../models/course";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalculationService } from '../../services/calculation.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss',
})
export class CourseItemComponent implements OnInit, OnChanges {

  @Input() course: Course = {
    id: "0", name: "", hours: 0, percentageCompleted: 0
  };

  @Input() selected = false;

  @Output() removeCourse = new EventEmitter<any>();

  @Output() courseUpdated = new EventEmitter<any>();

  hoursPerWeek = 0;

  constructor(
    private calculationService: CalculationService,
    private courseService: CourseService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculateHoursPeWeek();
  }

  calculateHoursPeWeek() {
    this.hoursPerWeek = this.calculationService.getHoursPerWeek(this.course);
    this.courseUpdated.emit();
  }

  remove() {
    this.removeCourse.emit(this.course);
  }

  markComplete() {
    this.course.percentageCompleted = 100;
    this.course.completionDate = this.course.completionDate || new Date();
    this.courseService.updateCourse(this.course).subscribe(() => {});
    this.selected = false;
  }
}