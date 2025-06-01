import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSummaryCardComponent } from './task-summary-card.component';

describe('TaskSummaryCardComponent', () => {
  let component: TaskSummaryCardComponent;
  let fixture: ComponentFixture<TaskSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
