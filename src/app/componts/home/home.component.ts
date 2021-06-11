import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
// js
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

// googlechart import here
import { GoogleChartInterface } from 'ng2-google-charts'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Create Variable here
  public page: number = 1;
  public covide19data: any = [];
  public Confirmed: number = 0;
  public Deaths: number = 0;
  public Recovered: number = 0;
  public Country: string = 'India';
  constructor(private dataService: DataServiceService) { }
  public countrys = ['Pakistan', 'Bangaladesh', 'Shrilanka', 'Nepal', 'China', 'Afganistan', 'Bhutan', 'India']
  public totalactivecases: number = 0;
  // googlePichart

  public isgooglechartready: boolean = false;
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Confirmed', this.Confirmed],
      ['Deaths', this.Deaths],
      ['Recovered', this.Recovered],


    ],

    options: { height: 500 },
  };
  // coulmnChart
  ngOnInit(): void {
    // myChartopen
// var myChart = new Chart("myChart", {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });
// let ctx:any = document.getElementById('divChart');
// var chart = new Chart(ctx, {
//   type: 'line',
//   data: {
//       datasets: [{
//           data: [0, 0],
//       }, {
//           data: [0, 1]
//       }, {
//           data: [1, 0],
//           showLine: true // overrides the `line` dataset default
//       }, {
//           type: 'scatter', // 'line' dataset default does not affect this dataset since it's a 'scatter'
//           data: [1, 1]
//       }]
//   }
// });

    // myChartclose
    // defult value show 
    this.getcoutery({ value: this.Country })
  }
  getcoutery(any: any) {
    this.isgooglechartready = false

    this.Country = any.value
    this.dataService.getGlobalData(any.value).subscribe(ref => {
      console.log(ref, 'ref')
      this.covide19data = ref;
      console.log(this.countrys[0]);
      // javaScript using the forEach
      this.covide19data.forEach((item: any) => {
        console.log(item)
        this.totalactivecases = this.totalactivecases + item.Active
        this.Confirmed = this.Confirmed + item.Confirmed
        this.Deaths = this.Deaths + item.Deaths
        this.Recovered = this.Recovered + item.Recovered

      });
      // pichart
      this.pieChart = {
        chartType: 'PieChart',
        dataTable: [
          ['Task', 'Hours per Day'],
          ['Confirmed', this.Confirmed],
          ['Deaths', this.Deaths],
          ['Recovered', this.Recovered],


        ],

        options: { 'title': 'Tasks' },
      };
      // coulmnChart
      this.isgooglechartready = true

    })

  }
}
