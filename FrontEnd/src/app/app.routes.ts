import { Routes } from '@angular/router';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';

export const routes: Routes = [
    { path: '', component: ListTaskComponent }
];
