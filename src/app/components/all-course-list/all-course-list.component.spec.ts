import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllCourseListComponent } from './all-course-list.component';

describe('AllCourseListComponent', () => {
  let component: AllCourseListComponent;
  let fixture: ComponentFixture<AllCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCourseListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
