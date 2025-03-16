import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit{

  //Creamos el dialogRef del modal que tenemos abierto
  public dialogRef = inject(MatDialogRef<CreateTaskComponent>);
  public error: boolean = false;
  //Creamos la variable que nos va a traer los datos que enviamos desde la pantalla padre para al momento de editar
  public data = inject<any>(MAT_DIALOG_DATA);

  taskForm = new FormGroup({
    //Creamos cada uno de los campos del formulario, donde si la variable data tiene datos creamos los campos con el valor que traiga, si no lo creamos en vacio
    title: new FormControl(this.data ? this.data.title : '', Validators.required),
    description: new FormControl(this.data ? this.data.description : '', Validators.required),
    state: new FormControl(this.data ? this.data.state : '', Validators.required)
  })

  ngOnInit(): void {
    //Si la variable data tiene datos desabilitamos los campos de title y description, esto para no poder editarlos en el formulario y solo poder editar el estado
    if(this.data){
      this.taskForm.get('title')?.disable();
      this.taskForm.get('description')?.disable();
    }
  }

  crear(): void{
    //Validamos si el formulario tiene todos los campos llenos
    if(this.taskForm.valid){
      //Volvemos a habilitar los campos que desabilitamos, para que pueda enviarlos al padre
      if(this.data){
        this.taskForm.get('title')?.enable();
        this.taskForm.get('description')?.enable();
      }
      this.error = false;
      this.dialogRef.close(this.taskForm.value);
    } else {
      this.error = true;
    }
  }

}
