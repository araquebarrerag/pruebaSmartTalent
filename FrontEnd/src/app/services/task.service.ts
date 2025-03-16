import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private url = 'http://localhost:8080';

  constructor(private http: HttpClient){  }

  getTask(){
    return this.http.get(this.url+'/getTask');
  }

  saveTask(task: any){
    return this.http.post(this.url+'/createTask', task);
  }

  updateTask(title: string, state: boolean){
    return this.http.put(this.url+'/updateTask?title='+title+'&state='+state,{});
  }

  deleteTask(title: string){
    return this.http.delete(this.url+'/deleteTask?title='+title);
  }
}
