import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {

  constructor(private http: HttpClient) {

  }

  getAlltaskList(): Observable<any> {
    return this.http.get('https://freeapi.miniprojectideas.com/api/JWT/GetAllTaskList');
  }

  createtask(obj: any): Observable<any> {
    return this.http.post('https://freeapi.miniprojectideas.com/api/JWT/CreateNewTask', obj);
  }

  editTask(obj: any): Observable<any> {
    return this.http.put('https://freeapi.miniprojectideas.com/api/JWT/UpdateTask', obj);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`https://freeapi.miniprojectideas.com/api/JWT/DeleteTask?itemId=${id}`);
  }
}
