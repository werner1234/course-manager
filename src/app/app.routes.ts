import {Route, Routes} from '@angular/router';
import {CourseListComponent} from "./components/course-list/course-list.component";
import {CertificatesComponent} from "./components/certificates/certificates.component";

export const appRoutes: Routes = [
  { path: '', component: CourseListComponent },
  { path: 'certificates', component: CertificatesComponent }
];