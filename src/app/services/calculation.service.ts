import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {

  constructor(private http: HttpClient) { }
  getHoursPerWeek(course: Course): number {
    if (!course.completionDate) { return 0; };

    const courseHoursLeft = course.hours * (1 - (course.percentageCompleted ?? 0) / 100);

    course.completionDate = typeof course.completionDate === 'string' ? new Date(course.completionDate) : course.completionDate;
    const timeLeft = course.completionDate.getTime() - new Date().getTime();
    const daysLeft = timeLeft / (1000 * 3600 * 24);

    // hours cannot be more than course hours, and cannot be less than 0 (for past dates)
    return Math.max(Math.min(courseHoursLeft / daysLeft * 7, courseHoursLeft), 0);
  }

  getNearestCompletionDateCourse(courses: Course[]): Course {
    courses = this.validateDates(courses);

    return courses.filter(c => c.completionDate).reduce((prev, current) => {
      return current.completionDate < prev.completionDate ? current : prev;
    }, courses[0]);
  }

  getMaxHoursPerDay(courses: Course[]) {
    let totalHoursPerDay: { [key: string]: number } = {};

    courses = this.validateDates(courses);

    courses.forEach(course => {
      const courseHoursLeft = course.hours * (1 - (course.percentageCompleted ?? 0) / 100);

      const timeLeft = course.completionDate!.getTime() - new Date().getTime();
      const daysLeft = timeLeft / (1000 * 3600 * 24);

      const hoursPerDay = courseHoursLeft / daysLeft;

      for (let count = 0; count < daysLeft; count++) {
        let todayBase = new Date();
        todayBase.setDate(todayBase.getDate() + count);
        totalHoursPerDay[todayBase.toDateString()] = (totalHoursPerDay[todayBase.toDateString()] + hoursPerDay) || hoursPerDay;
      }
    });

    if (Object.keys(totalHoursPerDay).length === 0) {
      return 0;
    }

    // find the key with the maximum value
    const maxKey = Object.keys(totalHoursPerDay).reduce((a, b) => totalHoursPerDay[a] > totalHoursPerDay[b] ? a : b);

    // get the maximum value
    const maxValue = totalHoursPerDay[maxKey];

    return maxValue;
  }

  validateDates(courses: Course[]) {
    // ensure all dates are Date objects
    courses.forEach(course => {
      if (typeof course.completionDate === 'string') {
        course.completionDate = new Date(course.completionDate);
      }
    });

    // get only future date courses
    return courses.filter(course => {
      return course.completionDate && course.completionDate > new Date() && course.percentageCompleted != 100;
    });
  }

  // used AI for this method
  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}