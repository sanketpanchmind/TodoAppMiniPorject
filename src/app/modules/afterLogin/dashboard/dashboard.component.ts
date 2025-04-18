import { Component, ViewChild } from '@angular/core';
import { TaskManagementService } from 'src/app/core/service/task-management.service';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild('chart') chart!: any;
  public chartOptions!: ChartOptions;


  dataLength: number = 0;
  completed: number = 0;
  pending: number = 0;

  constructor(private taskService: TaskManagementService) {
  }

  ngOnInit() {

    console.log("data length - ", this.dataLength);
    console.log("data length - ", this.completed);
    console.log("data length - ", this.pending);
    this.getdatatasks();
    this.updatechart();

  }

  getdatatasks() {
    const localdata = localStorage.getItem('Currentuser');
    if (localdata) {
      console.log(localdata);
      const localuser = JSON.parse(localdata);
      console.log("local user -- ", localuser.userId);
      this.taskService.getAlltaskList(localuser.userId).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log(res.length);
          this.dataLength = res.length;

          this.completed = res.filter((data: any) => data.isCompleted == true).length;
          console.log(this.completed);

          this.pending = res.filter((data: any) => data.isCompleted == false).length;
          this.updatechart();

        }
      })
    }
  }

  updatechart() {
    this.chartOptions = {
      series: [this.dataLength, this.completed, this.pending],
      chart: {
        type: 'pie',
      },
      labels: ['Total Task Data', 'Completed Task', 'Pending Task'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      legend: {
        position: 'bottom'
      }
    }
  }
}
