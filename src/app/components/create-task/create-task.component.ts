import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: [ './create-task.component.sass' ]
})
export class CreateTaskComponent implements OnInit {

  @Output() newTaskEvent: EventEmitter<TaskModel> = new EventEmitter();

  public taskForm: FormGroup;
  public sending: boolean;

  constructor(private tasksService: TaskService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [ '', [Validators.required, Validators.minLength(5)] ],
      state: [ false, Validators.required ]
    });
  }

  /**
   * Metodo encargado de crear la tarea
   * @return null
   */
  createTask(): void {
    const { title, state } = this.taskForm.value;
    this.sending = true;
    this.tasksService.createTask(new TaskModel(title, state))
      .subscribe(resp => {
        this.sending = false;
        this.taskForm.reset();
        this.taskForm.get('state').setValue(false);
        this.newTaskEvent.emit(resp);
        Swal.fire({
          title: 'Proceso exitoso!',
          text: 'La tarea se ha registrado correctamente',
          icon: 'success',
          toast: true
        });
      }, error => this.sending = false);
  }
}
