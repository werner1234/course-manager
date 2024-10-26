import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Course} from "../models/course";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(private http: HttpClient) { }
  getActiveCourses(): Observable<Course[]> {
    // used AI for this list
    return this.http.get<Course[]>('http://localhost:3000/active-courses');
  }

  getAllCourses(): Observable<Course[]> {
    // used AI for this list
    return this.http.get<Course[]>('http://localhost:3000/all-courses');
  }
}