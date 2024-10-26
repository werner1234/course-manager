import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-all-course-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './all-course-list.component.html',
  styleUrl: './all-course-list.component.scss',
})
export class AllCourseListComponent {
  @Input() activeCourses: Course[] = [];

  @Output() addCoursesEvent = new EventEmitter<any>();

  @Output() closeModalEvent = new EventEmitter<any>();

  allCourses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getAllCourses();
  }
  getAllCourses() {
    this.courseService.getAllCourses()
      .subscribe((courses) => {
        this.allCourses = courses;
        this.activeCourses.forEach(course2 => {
          const foundCourse = this.allCourses.find(course1 => course1.name === course2.name);
          foundCourse && (foundCourse.active = true);
        });
      });
  }

  addCourses() {
    this.addCoursesEvent.emit(this.allCourses
      .filter(c => c.selected)
      .map(c => ({ ...c, percentageCompleted: c.percentageCompleted ?? 0 }))
    );
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}