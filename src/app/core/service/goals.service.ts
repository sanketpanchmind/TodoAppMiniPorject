import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http: HttpClient) { }

  getgoalsbyUserId(id: any): Observable<any> {
    return this.http.get('https://api.freeprojectapi.com/api/GoalTracker/getAllGoalsByUser?userId=' + id);
  }

  creategoals(obj: any): Observable<any> {
    return this.http.post('https://api.freeprojectapi.com/api/GoalTracker/createGoalWithMilestones', obj);
  }
}
