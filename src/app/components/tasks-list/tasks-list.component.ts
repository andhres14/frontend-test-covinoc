import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/core/models/task.model';
import { TaskService } from '../../core/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: [ './tasks-list.component.sass' ]
})
export class TasksListComponent implements OnInit {

  public tasks: TaskModel[] = [];
  public allTasks: TaskModel[];
  public loading: boolean;
  public searchTerm: string;
  public paginator = {
    page: 1,
    pageSize: 5,
    total: 0
  };

  constructor(private tasksService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.loading = true;
    this.tasksService.getTasks()
      .subscribe(resp => {
        this.tasks = resp;
        this.allTasks = resp;
        this.paginator.total = resp.length;
        this.loading = false;
      }, error => this.loading = false);
  }

  searchTasks(value: string): void {
    this.tasks = this.allTasks.filter((val) => (val.id.toString().includes(value) || val.title.toLowerCase().includes(value)));
    this.paginator.total = this.tasks.length;
  }

  /**
   * Metodo para completar o no la tarea
   * @param task
   */
  updateStateTask(task: TaskModel): void {
    this.tasksService.updateTaskState(task.id, task.state)
      .subscribe(resp => {
        const stateTitle = !resp.state ? 'Tarea no completada' : 'Tarea completada';
        Swal.fire({
          title: stateTitle,
          text: 'El estado de la tarea se ha actualizado correctamente',
          icon: 'success',
          toast: true
        });
      }, error => {
        task.state = !(task.state);
      });
  }

  deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId)
      .subscribe(resp => {
        Swal.fire({
          title: 'Tarea eliminada',
          icon: 'success',
          toast: true
        });
        this.getTasks();
      });
  }

  addNewTask(task: TaskModel): void {
    this.searchTerm = '';
    this.getTasks();
    // this.tasks.push(task);
    // this.allTasks.push(task);
    // this.paginator.total = this.tasks.length;
  }

  trackByItems(index: number, task: TaskModel): number {
    return task.id;
  }
}
