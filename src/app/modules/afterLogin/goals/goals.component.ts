import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { GoalsService } from 'src/app/core/service/goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent {

  addgoalsform: FormGroup | any;
  goalsArraytbl: any[] = [];
  localdata: any;

  @ViewChild('creategoalmodal') goalsModal!: ElementRef;

  constructor(private goalService: GoalsService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.getGoalsformsfields();
    this.getGoalsbyUserId();
    this.localdata = localStorage.getItem('Currentuser');
    if (!this.localdata) {
      return;
    }
  }
  createmodal() {
    this.goalsModal.nativeElement.style.display = 'block';
  }

  closemodal() {
    this.goalsModal.nativeElement.style.display = 'none';
  }


  getGoalsformsfields() {
    this.addgoalsform = this.fb.group({
      goalName: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      isAchieved: new FormControl(''),
      milestones: this.fb.array([this.createMilestoneGroup()])

    })
  }
  createMilestoneGroup(): FormGroup {
    return this.fb.group({
      milestoneName: [''],
      description: [''],
      targetDate: [''],
      isCompleted: [false]
    });
  }

  getGoalsbyUserId() {
    const localdata = localStorage.getItem('Currentuser');
    if (!localdata) {
      return;
    }
    const currentuser = JSON.parse(localdata);
    console.log(currentuser.userId);
    this.goalService.getgoalsbyUserId(currentuser.userId).subscribe({
      next: (res: any) => {
        console.log("goals by user id", res);
        this.goalsArraytbl = res;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  get milestones(): FormArray {
    return this.addgoalsform.get('milestones') as FormArray;
  }


  submitgoals() {
    console.log(this.addgoalsform.value);
    let obj = this.addgoalsform.value;

    const localdata = localStorage.getItem('Currentuser');
    if (!localdata) {
      return;
    }
    const currentuser = JSON.parse(localdata);
    console.log("submit ---", currentuser.userId);
    const params = {
      userId: currentuser.userId,
      goalName: obj?.goalName,
      description: obj?.description,
      startDate: obj?.startDate,
      endDate: obj?.endDate,
      isAchieved: Boolean(obj?.isAchieved), // ✅ Convert to Boolean
      milestones: obj?.milestones.map((m: any) => ({
        milestoneName: m.milestoneName,
        description: m.description,
        targetDate: new Date(),
        isCompleted: Boolean(m.isCompleted),
      }))
    }
    console.log("add goals - ", params);

    this.goalService.creategoals(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.closemodal();
        this.getGoalsbyUserId();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
