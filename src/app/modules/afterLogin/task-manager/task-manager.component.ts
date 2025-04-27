import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { TaskManagementService } from 'src/app/core/service/task-management.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent {

  addtaskform: FormGroup | any;

  tasklisttblArray: any[] = [];
  editflag: boolean = false;
  currentuserid: number = 0;
  taskid: number = 0;
  @ViewChild('createtaskmodal') createtaskmodal!: ElementRef

  constructor(private taskservice: TaskManagementService, public fb: FormBuilder, private auth: AuthService) {

  }
  ngOnInit() {
    this.createform();
    this.getAllTasks();
    const id = localStorage.getItem('Currentuser');
    if (id) {
      const currentuser = JSON.parse(id);
      console.log("current user id constructor-", currentuser);
      this.currentuserid = currentuser.userId;
      console.log(this.currentuserid);
    }
  }
  get f() {
    return this.addtaskform.controls;
  }
  clear() {
    this.addtaskform.reset();
  }
  createform() {
    this.addtaskform = this.fb.group({
      taskName: new FormControl('', [Validators.required, Validators.pattern('^[A-Z-a-z ]+$')]),
      description: new FormControl('', [Validators.required]),
      frequency: new FormControl('', [Validators.required]),
      createdDate: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      isCompleted: new FormControl('', [Validators.required]),
    })
  }

  createtask() {
    // this.editflag = false;                     // Reset to Create mode
    // this.clear();                              // Reset the form fields
    this.createtaskmodal.nativeElement.style.display = 'block';
  }


  closemodal() {
    this.createtaskmodal.nativeElement.style.display = 'none';
    this.editflag = !this.editflag;
    console.log("modal closed", this.editflag);
    this.clear();
  }



  getAllTasks() {
    const id = localStorage.getItem('Currentuser');
    if (id) {
      const currentuser = JSON.parse(id);
      // console.log("current user id-", currentuser);
      const currentuserid = currentuser.userId;
      this.taskservice.getAlltaskList(currentuserid).subscribe({
        next: (res: any) => {
          console.log(res);
          this.tasklisttblArray = res;
        },
        error: (error: any) => {
          console.log(error, error.message);
        }
      })
    }

  }

  createNewTask() {
    console.log(this.editflag);

    const user = this.auth.getUser();
    console.log("current user - ", user);

    const obj = this.addtaskform.value;

    const params = {
      task: obj?.taskName,
      taskName: obj?.taskName,
      description: 'Description',
      frequency: obj?.frequency,
      createdDate: obj?.createdDate,
      startDate: obj?.createdDate,
      dueDate: obj?.dueDate,
      isCompleted: obj?.isCompleted === true || obj?.isCompleted === 'true' ? true : false,
      userId: user?.userId
    }
    console.log(params);

    this.taskservice.createtask(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.clear();
        this.closemodal();
        this.getAllTasks();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  editTask(params: any) {
    this.editflag = true;
    console.log("**********edit fn ************", this.editflag);

    const user = this.auth.getUser();
    console.log("current user - ", user);
    console.log("Values to be edited -- ", params);

    this.taskid = params.taskId;   // <--- SAVE taskId here!
    console.log("Task ID to update --> ", this.taskid);

    if (params.createdDate && params.dueDate) {
      const formattedstartdate = params.createdDate.split('T');
      console.log("Start Date ----", formattedstartdate);

      const formattedduedate = params.dueDate.split('T');
      console.log("Due Date ---", formattedduedate);

      this.addtaskform.patchValue({
        task: params?.taskName,
        taskName: params?.taskName,
        description: 'Description',
        frequency: params?.frequency,
        createdDate: formattedstartdate[0],
        startDate: formattedstartdate[0],
        dueDate: formattedduedate[0],
        isCompleted: params?.isCompleted === true || params?.isCompleted === 'true' ? true : false,
        userId: user?.userId
      });
    }
    this.createtask();
  }

  updateTask() {
    const obj = this.addtaskform.value;
    const user = this.auth.getUser();
    console.log("current user - ", user);

    const params = {
      taskId: this.taskid,
      task: obj?.taskName,
      taskName: obj?.taskName,
      description: 'Description',
      frequency: obj?.frequency,
      createdDate: obj?.createdDate,
      startDate: obj?.createdDate,
      dueDate: obj?.dueDate,
      isCompleted: obj?.isCompleted === true || obj?.isCompleted === 'true' ? true : false,
      userId: user?.userId
    }
    console.log(params);
    this.taskservice.editTask(params).subscribe({
      next: (res: any) => {
        console.log("tasks updates", res);
        this.closemodal();
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }



  deletetask(tasklist: any) {
    console.log(tasklist.taskId);
    // const record = this.tasklisttblArray.find(item => item.itemId == tasklist.itemId);

    this.taskservice.delete(tasklist.taskId).subscribe({
      next: (res: any) => {
        console.log("delete id ", res);
        // localStorage.removeItem('Tasks');
        // this.tasklisttblArray = this.tasklisttblArray.filter((task: any) => task.taskId !== tasklist.taskId);
        // localStorage.setItem('Tasks', JSON.stringify(this.tasklisttblArray));

      },
      error: (error: any) => {
        console.error(error);
      }
    })



  }
}
