import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TaskService, Task, TaskStatus } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [CommonModule, NgClass, NgStyle, FormsModule, HttpClientModule],
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks: Task[] = [];
  showAddForm = false;

  statusOptions: TaskStatus[] = ['À faire', 'En cours', 'Complété'];

  newTask: Partial<Task> = {
    title: '',
    status: 'À faire',
    progress: 0,
    deadline: new Date().toISOString().substring(0, 10)
  };

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Erreur API tâches :', err),
    });
  }

  openAddTaskForm() {
    this.showAddForm = !this.showAddForm;
  }

  addTask() {
    this.taskService.createTask(this.newTask).subscribe({
      next: (created) => {
        this.tasks.push(created);
        this.showAddForm = false;
        this.newTask = {
          title: '',
          status: 'À faire',
          progress: 0,
          deadline: ''
        };
      },
      error: (err) => console.error('Erreur ajout tâche :', err),
    });
  }

  toggleDropdown(task: Task) {
    task.showDropdown = !task.showDropdown;
  }

  updateStatus(taskId: string, newStatus: 'À faire' | 'En cours' | 'Complété') {
  const updatedProgress = {
    'À faire': 0,
    'En cours': 45,
    'Complété': 100
  }[newStatus];

  this.taskService.updateTaskStatus(taskId, newStatus, updatedProgress).subscribe({
    next: () => {
      const task = this.tasks.find(t => t._id === taskId);
      if (task) {
        task.status = newStatus;
        task.progress = updatedProgress;
        task.showDropdown = false;
      }
    },
    error: (err) => console.error('Erreur mise à jour statut :', err),
  });
}

  getStatusClass(status: TaskStatus): string {
    return {
      'À faire': 'bg-red-100 text-red-700',
      'En cours': 'bg-yellow-100 text-yellow-800',
      'Complété': 'bg-green-100 text-green-700',
    }[status] || 'bg-gray-100 text-gray-700';
  }

  getStatusColor(status: TaskStatus): string {
    return {
      'À faire': '#f87171',
      'En cours': '#facc15',
      'Complété': '#4ade80',
    }[status] || '#a3a3a3';
  }

  getProgressColor(progress: number): string {
    if (progress === 100) return '#22c55e';
    if (progress >= 50) return '#facc15';
    if (progress > 0) return '#fb923c';
    return '#e11d48';
  }
}
