import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import {SharedDataService} from '../shared-data.service'


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  title = 'ng-chart';
  chart: any = [];
  data: any = [0, 0, 0, 0];
  background: string[] = [];
  labels: string[] = [
    'negative_count',
    'neutral_count',
    'positive_count',
    'undetermined_count',
  ];
  sen_analysis_object: any = {
    negative_count: { color: 'rgba(255, 0, 0, 1)', value: 0 },
    neutral_count: { color: 'rgba(255, 255, 0, 0.5)', value: 0 },
    positive_count: { color: 'rgba(144, 238, 144, 1)', value: 0 },
    undetermined_count: { color: 'rgba(0, 0, 255, 0.6)', value: 0 },
  };
  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.currentData.subscribe((data) => {
      console.log(typeof this.chart);

      if (data) {
        this.chart.destroy();
      }
      //To test on bigger value we can uncomment reintialization.
      //  data = this.getdumyData()
      const sortedObject = Object.entries(data).sort((a, b) => b[1] - a[1]);
      this.createBarChart(sortedObject);
    });
  }

  createBarChart(sortedObject: any) {
    let index = 0;
    for (let [key, value] of sortedObject) {
      this.data[index] = value;
      this.labels[index] = key;
      this.background[index] = this.sen_analysis_object[key].color;
      index++;
    }
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'sentiment',
            data: this.data,
            borderWidth: 1,
            backgroundColor: this.background,
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
      },
    });
  }

  getdumyData() {
    return {
      negative_count: 20,
      neutral_count: 31,
      positive_count: 50,
      undetermined_count: 70,
    };
  }
}