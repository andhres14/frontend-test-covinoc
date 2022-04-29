import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { filter, map } from 'rxjs/operators';

const { MOCK_API } = environment;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /**
   * Get tasks registered
   */
  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${ MOCK_API }todos`).
      pipe(
        map(tasks => tasks.filter(task => (task.title != null && task.id != null)))
    );
  }

  /**
   * Register new task
   * @param task task object to create
   */
  createTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${ MOCK_API }todos`, task);
  }

  /**
   * Update task state
   * @param taskId
   * @param isCompleted
   */
  updateTaskState(taskId: number, isCompleted: boolean): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${ MOCK_API }todos/${ taskId }`, { state: isCompleted });
  }

  /**
   * Delete task
   * @param taskId
   */
  deleteTask(taskId: number): Observable<TaskModel> {
    return this.http.delete<TaskModel>(`${ MOCK_API }todos/${ taskId }`);
  }
}
