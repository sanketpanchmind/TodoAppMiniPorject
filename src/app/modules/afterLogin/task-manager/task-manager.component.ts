import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  @ViewChild('createtaskmodal') createtaskmodal!: ElementRef

  constructor(private taskservice: TaskManagementService, public fb: FormBuilder) {

  }
  ngOnInit() {
    this.createform();
    this.getAllTasks();
  }

  createform() {
    this.addtaskform = this.fb.group({
      taskname: new FormControl(''),
      taskdescription: new FormControl(''),
      createdOn: new FormControl(''),
      duedate: new FormControl(''),
      isCompleted: new FormControl(false),
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
      console.log("current user id-", currentuser);
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
    console.log(this.addtaskform.value);
    let obj = this.addtaskform.value;

    const params: any = {
      taskname: obj?.taskname,
      taskdescription: obj?.taskdescription,
      createdOn: obj?.createdOn,
      duedate: obj?.duedate,
      isCompleted: obj?.isCompleted,
      completedOn: obj?.duedate
    };

    this.taskservice.createtask(params).subscribe({
      next: (res: any) => {
        console.log(res.result, res.message);
        this.getAllTasks();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  editTask(params: any) {
    this.editflag = true;
    console.log("params", params);

    if (!this.addtaskform) {
      console.log("form not init");
      return;
    }
    const formattedcreatedate = params.createdOn ? new Date(params.createdOn).toISOString().split('T')[0] : '';
    console.log("create Date", formattedcreatedate);

    const formattedduedate = params.dueDate ? new Date(params.dueDate).toISOString().split('T')[0] : '';
    console.log("due Date", formattedduedate);

    const newparams = this.addtaskform.patchValue({
      taskname: params?.taskName,
      taskdescription: params?.taskDescription,
      createdOn: formattedcreatedate,
      duedate: formattedduedate,
      isCompleted: params?.isCompleted,
    });

    console.log(newparams);

    this.createtask();

  }

  updateTask() {
    if (!this.editflag) {
      console.log("No task is being edited.");
      return;
    }

    console.log("Updating Task:", this.addtaskform.value);

    const updatedTask = {
      taskName: this.addtaskform.value.taskname,
      taskDescription: this.addtaskform.value.taskdescription,
      createdOn: this.addtaskform.value.createdOn,
      dueDate: this.addtaskform.value.duedate,
      isCompleted: this.addtaskform.value.isCompleted
    };

    this.taskservice.editTask(updatedTask).subscribe({
      next: (res: any) => {
        console.log("Task Updated Successfully:", res.message);
        this.getAllTasks(); // Refresh task list
        this.closemodal(); // Close modal
        this.editflag = false; // Reset flag
        this.addtaskform.reset(); // Clear form
      },
      error: (error: any) => {
        console.error("Update Failed:", error);
      }
    });
  }



  deletetask(tasklist: any) {
    console.log(tasklist.itemId);
    const record = this.tasklisttblArray.find(item => item.itemId == tasklist.itemId);
    console.log("Record - ", record);
    if (tasklist.itemId === record.itemId) {
      this.taskservice.delete(record.itemId).subscribe({
        next: (res: any) => {
          console.log(res.message);
          this.getAllTasks();
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }



  }
}
