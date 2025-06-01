import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-summary-card.component.html',
  styleUrls: ['./task-summary-card.component.css']
})
export class TaskSummaryCardComponent {
  @Input() title = '';
  @Input() completed = 0;
  @Input() total = 0;
}
