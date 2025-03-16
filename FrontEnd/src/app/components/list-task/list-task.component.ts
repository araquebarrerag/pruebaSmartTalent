import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-list-task',
  imports: [CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {

  public load: boolean = false;
  public tasks: any = [];
  public dialog = inject(MatDialog);

  taskForm = new FormGroup({
    FilterTests: new FormControl('')
  })

  constructor(
    private taskService: TaskService
  ){}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(event?: any){
    //Inicializamos en vacio el arreglo de las tareas
    this.tasks = [];
    if(event == undefined){
      this.load = false;
    }
    //Llamamos el servicio que trae todas las tareas
    this.taskService.getTask().subscribe({
      next: (response) => {
        this.tasks = response;
      },
      complete: () =>{
        if(event != undefined && event != 2){
          this.tasks = this.tasks.filter((tarea: any) => tarea.state == event);
        }
        this.load = true;
      },
      error: (err) => {
        console.log(err);
        this.load = true;
      }
    });
  }

  delete(task: any): void{
    this.taskService.deleteTask(task.title).subscribe({
      next: (response) => {
        console.log(response)
      },
      complete: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.log(err);
        this.loadTasks();
      }
    })
  }

  edit(task: any): void{
    //Abrimos el modal que usamos para crear una tarea, pero en este caso le enviamos la tarea para que el componente entienda que es para edicion y no creacion
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != null){
        //Actualizamos la tarea con el mismo titulo y le agregamos el nuevo estado
        this.taskService.updateTask(task.title, result.state).subscribe({
          next: (response) => {
            console.log(response);
          },
          complete:() => {
            this.loadTasks();
          },
          error: (err) => {
            console.log(err);
            this.loadTasks();
          }
        });
      }
    })
  }

  openDialog(): void {
    //Abrimos el modal del componente que vamos a usar para crear una nueva tarea
    const dialogRef = this.dialog.open(CreateTaskComponent)

    //Corremos una funcion para que se ejecute cuando se este cerrando el modal
    dialogRef.afterClosed().subscribe(result => {
      //Creamos la nueva tarea siempre y cuando el resultado que viene del modal exista
      if(result != undefined && result != null){
        let newTask = result;
        //Agregamos a la base de datos la nueva tarea
        this.taskService.saveTask(newTask).subscribe({
          next: (response) => {
            console.log(response);
          },
          complete: () => {
            //Cuando se complete la creacion de la tarea llamamos el metodo de traer las tareas para mostrar la nueva tarea
            this.loadTasks();
          },
          error: (err) => {
            console.log(err);
            this.loadTasks();
          }
        });
      }
    })
  }

}
