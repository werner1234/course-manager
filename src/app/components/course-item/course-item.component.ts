import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Course} from "../../models/course";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

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
export class CourseItemComponent {

  @Input() course: Course = {
    name: "", hours: 0, percentageCompleted: 0
  };

  @Input() selected = false;

  @Output() removeCourse = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }

  remove() {
    this.removeCourse.emit(this.course);
  }

  markComplete() {
    this.course.percentageCompleted = 100;
    this.selected = false;
  }
}