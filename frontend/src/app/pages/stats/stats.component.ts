import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks: Task[] = [];

  countTodo = 0;
  countInProgress = 0;
  countDone = 0;

  taskStatusData: { name: string; value: number }[] = [];

  view: [number, number] = [700, 400];

  colorScheme = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#fa6969', '#f6f6f6', '#333333'],
  };

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.countTodo = this.tasks.filter(t => t.status === 'À faire').length;
        this.countInProgress = this.tasks.filter(t => t.status === 'En cours').length;
        this.countDone = this.tasks.filter(t => t.status === 'Complété').length;

        this.taskStatusData = [
          { name: 'À faire', value: this.countTodo },
          { name: 'En cours', value: this.countInProgress },
          { name: 'Complété', value: this.countDone },
        ];
      },
      error: (err) => console.error('Erreur chargement stats :', err),
    });
  }

  getTotal(): number {
    return this.countTodo + this.countInProgress + this.countDone;
  }

  getPercentage(count: number): number {
    const total = this.getTotal();
    return total === 0 ? 0 : Math.round((count / total) * 100);
  }
}
