import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private taskservice: TaskManagementService, public fb: FormBuilder) {

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
      isCompleted: new FormControl('false', [Validators.required]),
    })
  }

  createtask() {
    this.createtaskmodal.nativeElement.style.display = 'block';
  }

  closemodal() {
    this.createtaskmodal.nativeElement.style.display = 'none';
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

  //   {
  //   "taskId": 0,
  //     "taskName": "string",
  //       "description": "string",
  //         "frequency": "string",
  //           "createdDate": "2025-04-07T15:13:45.509Z",
  //             "startDate": "2025-04-07T15:13:45.509Z",
  //               "dueDate": "2025-04-07T15:13:45.509Z",
  //                 "isCompleted": false,
  //                   "userId": 0
  // }

  createNewTask() {
    if (this.addtaskform.invalid) {
      return;
    }
    console.log(this.addtaskform.value);
    let obj = this.addtaskform.value;

    const id = localStorage.getItem('Currentuser');
    if (id) {
      const currentuser = JSON.parse(id);
      console.log("current user id constructor-", currentuser);
      const currentuserid = currentuser.userId;

      const params: any = {
        taskName: obj?.taskName,
        description: obj?.description,
        frequency: obj?.frequency,
        createdDate: obj?.createdDate,
        startDate: obj?.startDate,
        dueDate: obj?.dueDate,
        isCompleted: false,
        userId: currentuserid,
      };
      console.log(params);

      this.taskservice.createtask(params).subscribe({
        next: (res: any) => {
          console.log("tasks created--", res);
          localStorage.setItem('Tasks', JSON.stringify(res));
          this.getAllTasks();
          this.closemodal();
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

  editTask(params: any) {
    this.editflag = true;
    console.log("params", params);
    console.log("params usr id", params.userId);

    console.log("task Id", params.taskId);
    this.taskid = params.taskId;

    const localuser = this.tasklisttblArray.find((data: any) => data.userId == params.userId);
    console.log("user found in Array", localuser);
    console.log("local user", localuser.description);

    if (!this.addtaskform) {
      console.log("form not init");
      return;
    }
    const formattedcreatedate = params.createdDate ? new Date(params.createdDate).toISOString().split('T')[0] : '';
    console.log("create Date", formattedcreatedate);



    const formattedduedate = params.dueDate ? new Date(params.dueDate).toISOString().split('T')[0] : '';
    console.log("due Date", formattedduedate);

    // Stored the task in localstorage and retrieved the items that API was not sending from local Storage to show the data to edit on form
    const getuser = localStorage.getItem('Tasks');
    if (!getuser) {
      return;
    }
    console.log("get user - ", getuser);
    const allTasks = JSON.parse(getuser);
    const localdatauser = allTasks.find((task: any) => task.taskId === params.taskId);
    // const localdatauser = JSON.parse(getuser);



    console.log("local user - ", localdatauser);
    console.log("local user desc", localdatauser.description, "start Date - ", localdatauser.startDate);

    const formattedstartDate = localdatauser.startDate ? new Date(localdatauser.startDate).toISOString().split('T')[0] : '';
    console.log("start Date", formattedstartDate);


    this.addtaskform.patchValue({
      taskName: params?.taskName,
      description: localdatauser.description,
      frequency: params?.frequency,
      createdDate: formattedcreatedate,
      startDate: formattedstartDate,
      dueDate: formattedduedate,
      isCompleted: false,
      userId: params?.userId,
    });
    // console.log(params);

    // console.log(newparams);

    this.createtask();

  }

  updateTask() {
    if (!this.editflag) {
      console.log("No task is being edited.");
      return;
    }

    console.log("Updating Task:", this.addtaskform.value);

    const updatedTask = {
      taskId: this.taskid,
      taskName: this.addtaskform.value.taskName,
      description: this.addtaskform.value.description,
      frequency: this.addtaskform.value.frequency,
      createdDate: this.addtaskform.value.createdDate,
      startDate: this.addtaskform.value.startDate,
      dueDate: this.addtaskform.value.dueDate,
      isCompleted: this.addtaskform.value.isCompleted,
      userId: this.currentuserid,
    };

    console.log("update Task - ", updatedTask);
    this.taskservice.editTask(updatedTask).subscribe({
      next: (res: any) => {
        console.log("Task Updated Successfully:", res);

        // 🔁 Update the task in tasklisttblArray
        const index = this.tasklisttblArray.findIndex((task: any) => task.taskId === this.taskid);
        if (index !== -1) {
          this.tasklisttblArray[index] = {
            ...this.tasklisttblArray[index],
            ...updatedTask
          };
        }
        // 💾 Save the updated task array to localStorage
        localStorage.setItem('Tasks', JSON.stringify(this.tasklisttblArray));

        this.getAllTasks(); // Optional if you're refreshing from backend
        this.closemodal();
        this.editflag = false;
        this.addtaskform.reset();
      },
      error: (error: any) => {
        console.error("Update Failed:", error);
      }
    });
  }



  deletetask(tasklist: any) {
    console.log(tasklist.taskId);
    // const record = this.tasklisttblArray.find(item => item.itemId == tasklist.itemId);

    this.taskservice.delete(tasklist.taskId).subscribe({
      next: (res: any) => {
        console.log("delete id ", res);
      },
      error: (error: any) => {
        console.error(error);
      }
    })



  }
}
