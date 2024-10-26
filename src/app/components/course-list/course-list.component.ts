import {Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course";
import {CourseItemComponent} from "../course-item/course-item.component";
import {MatButtonModule} from "@angular/material/button";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    CourseItemComponent,
    MatButtonModule,
    MatIconModule
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
  onClickOutside(event: MouseEvent): void {
    this.selectedCourse = null;
  }

  activeCourses: Course[] = [];

  allCourses: Course[] = [];

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

  toggleAddCourse() {
    this.addCourseOpen = !this.addCourseOpen;
    this.getAllCourses();
  }

  removeCourse(course: Course) {
    this.activeCourses = this.activeCourses.filter((c) => c !== course);
    this.selectedCourse = null;
  }

  addCourses() {
    this.activeCourses = this.activeCourses.concat(this.allCourses
      .filter(c => c.selected)
      .map(c => ({ ...c, percentageCompleted: c.percentageCompleted ?? 0 })));
    this.selectedCourse = null;
    this.addCourseOpen = false;
  }
}