import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export type TaskStatus = 'À faire' | 'En cours' | 'Complété';

export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  progress: number;
  deadline: string;
  showDropdown?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Partial<Task>) {
  return this.http.post<Task>(`${this.apiUrl}`, task);
}

updateTaskStatus(taskId: string, status: 'À faire' | 'En cours' | 'Complété', progress: number) {
  return this.http.put<Task>(`${this.apiUrl}/${taskId}`, {
    status,
    progress
  });
}
}
