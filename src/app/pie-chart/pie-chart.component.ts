import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { SentimentSummary } from '../interfaces/ISentimentSummary'; 
import {SharedDataService} from '../shared-data.service'


function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number';
}


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
  data: number[] = [0, 0, 0, 0];
  background: string[] = [];
  labels: string[] = [
    'negative_count',
    'neutral_count',
    'positive_count',
    'undetermined_count',
  ];
  sen_summary_object: SentimentSummary = {
    negative_count: { color: 'rgba(234, 67, 53, 1)', value: 0 },
    neutral_count: { color: 'rgba(251, 188, 5, 1)', value: 0 },
    positive_count: { color: 'rgba(52, 168, 83, 1)', value: 0 },
    undetermined_count: { color: 'rgba(66, 133, 244, 1)', value: 0 },
  };
  constructor(private sharedDataService: SharedDataService) {}
  


  ngOnInit() {

  }

  ngAfterContentInit(){
    this.sharedDataService.currentData.subscribe((data) => {
      console.log(typeof this.chart);

      if (data) {
        this.chart.destroy();
      }

      for (const [key, value] of Object.entries(data)) {
        if (key == 'sentiment_counts') {
          for (const [sentiment_key, count] of Object.entries(value)) {
            if (isNumber(count)) {
              this.sen_summary_object[sentiment_key].value = count;
            }
          }
        }
      }

      let sortedObject = Object.entries(this.sen_summary_object).sort((a, b) => b[1].value - a[1].value);
      this.createBarChart(sortedObject);
    });
  }

  createBarChart(sortedObject: any) {
    console.log(sortedObject);
    let index = 0;
    for (let [key, {color, value}] of sortedObject) {
      this.data[index] = value;
      this.labels[index] = key;
      this.background[index] = color;
      index++;
    }
    // var ctx = document.getElementById()
    // if(document.getElementById)
    //   ctx = document?.getElementById("canvas").getContext("2d")

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
      negative_count: 400,
      neutral_count: 301,
      positive_count: 1200,
      undetermined_count: 170,
    };
  }
}