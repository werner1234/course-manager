import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course";
import {MatIconModule} from "@angular/material/icon";
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent {

  completedCourses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getCompletedCourses();
  }

  getCompletedCourses() {
    this.courseService.getActiveCourses()
      .subscribe((courses) => {
        this.completedCourses = courses.filter(c => c.percentageCompleted === 100);
      });
  }

  // used AI for this method, but had to change a bit
  downloadCert(course: Course) {
    const doc = new jsPDF();

    // customize font and size
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');

    // add certificate title
    doc.text('Certificate of Completion', 10, 40);

    // add course name and completion date
    doc.setFontSize(12);
    doc.text(`Course name: ${course.name}`, 10, 60);
    if (course.completionDate) { doc.text(`Completion date: ${course.completionDate}`, 10, 70);}

    // save the PDF
    doc.save(`${course.name}.pdf`);
  }
}