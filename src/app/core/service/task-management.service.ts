import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {

  constructor(private http: HttpClient) {

  }

  getAlltaskList(id: number): Observable<any> {
    return this.http.get('https://api.freeprojectapi.com/api/GoalTracker/getAllTasks?userId=' + id);
  }

  createtask(obj: any): Observable<any> {
    return this.http.post('https://api.freeprojectapi.com/api/GoalTracker/createTask', obj);
  }

  editTask(obj: any): Observable<any> {
    return this.http.put(`https://api.freeprojectapi.com/api/GoalTracker/updateTask/${obj.taskId}`, obj);
  }
  delete(id: any): Observable<any> {
    // return this.http.delete(`https://freeapi.miniprojectideas.com/api/JWT/DeleteTask?itemId=${id}`);
    return this.http.delete(`https://api.freeprojectapi.com/api/GoalTracker/deleteTask/${id}`);
  }
}
