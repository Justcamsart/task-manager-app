import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMonthComponent } from '../calendar/calendar.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CalendarMonthComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
  private taskService = inject(TaskService);

  taskStats = {
    àFaire: { completed: 0, total: 0 },
    enCours: { completed: 0, total: 0 },
    terminée: { completed: 0, total: 0 },
    enAttente: { completed: 0, total: 0 },
  };

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      for (const task of tasks) {
        const statusKey = this.getStatusKey(task.status);

        if (statusKey && this.taskStats[statusKey]) {
          this.taskStats[statusKey].total++;
          if (task.progress === 100) {
            this.taskStats[statusKey].completed++;
          }
        }
      }
    });
  }

  // correspondances des statuts (back) → propriétés du front
  getStatusKey(status: string): keyof typeof this.taskStats | null {
    switch (status.toLowerCase()) {
      case 'à faire':
        return 'àFaire';
      case 'en cours':
        return 'enCours';
      case 'terminé':
        return 'terminée';
      case 'en attente':
        return 'enAttente';
      default:
        return null;
    }
  }

  taskProgress = [
    {
      title: 'Développement Web',
      percent: 34,
      color: '#fa6969'
    },
    {
      title: 'Design Mobile App',
      percent: 55,
      color: '#fcb5b5'
    }
  ];
}
