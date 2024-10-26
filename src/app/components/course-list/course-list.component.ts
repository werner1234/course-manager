import {Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course";
import {CourseItemComponent} from "../course-item/course-item.component";
import {MatButtonModule} from "@angular/material/button";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatIconModule} from "@angular/material/icon";
import {OverviewComponent} from "../overview/overview.component";
import {AllCourseListComponent} from "../all-course-list/all-course-list.component";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    CourseItemComponent,
    MatButtonModule,
    MatIconModule,
    OverviewComponent,
    AllCourseListComponent
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
  animations: [
    trigger('slideIn',
      [
        state('in', style({
          transform: 'translateX(0)'
        })),
        state('out', style({
          transform: 'translateX(100%)'
        })),
        transition('out => in', animate('300ms ease-in')),
        transition('in => out', animate('300ms ease-out'))

      ])
  ]
})
export class CourseListComponent {
  @HostListener('document:click', ['$event'])
  onClickOutside(): void {
    this.selectedCourse = null;
  }

  activeCourses: Course[] = [];

  selectedCourse: Course | null = null;

  addCourseOpen = false;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getActiveCourses();
  }

  getActiveCourses() {
    this.courseService.getActiveCourses()
      .subscribe((courses) => {
        this.activeCourses = courses;
      });
  }

  toggleAddCourse() {
    this.addCourseOpen = !this.addCourseOpen;
  }

  removeCourse(course: Course) {
    this.activeCourses = this.activeCourses.filter((c) => c !== course);
    this.selectedCourse = null;
  }

  addCourses(courses: Course[]) {
    this.activeCourses = this.activeCourses.concat(courses);
    this.selectedCourse = null;
    this.addCourseOpen = false;
  }

  closeModal() {
    this.addCourseOpen = false;
  }
}