import { ChangeDetectorRef, Component, Inject,PLATFORM_ID, afterRender } from '@angular/core';
import Chart from 'chart.js/auto';
import { SentimentSummary } from '../interfaces/ISentimentSummary';
import {SharedDataService} from '../shared-data.service';
import {BackendApiResponse} from '../interfaces/IBackendApiResponse';


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
  chart: Chart
  data: number[] = [0, 0, 0, 0];
  background: string[] = [];
  labels: string[] = [
    'positive %',
    'neutral %',
    'negative %',
    'undetermined %',
  ];
  sen_summary_object: SentimentSummary = {
    negative: { color: 'rgba(234, 67, 53, 1)', count: 0, percent: 0 },
    neutral: { color: 'rgba(251, 188, 5, 1)', count: 0, percent: 0 },
    positive: { color: 'rgba(52, 168, 83, 1)', count: 0, percent: 0 },
    undetermined: { color: 'rgba(66, 133, 244, 1)', count: 0, percent: 0 },
  };
  total: number = 0;

  constructor(@Inject(SharedDataService)private sharedDataService: SharedDataService,
        @Inject(PLATFORM_ID) private platformId: Object,private cdRef: ChangeDetectorRef) {
    console.log('Pie Chart Constructor')
  }


  ngOnInit() {
 
  }

  ngAfterViewInit(){
    if(this.platformId == 'server')
       return
    this.sharedDataService.currentData.subscribe((data) => {
      if (this.chart) {
        this.chart.destroy();
      }
      try{
      const { sentiment_summary } = data as BackendApiResponse     
      for (const [key, value] of Object.entries(sentiment_summary)) {
        this.sen_summary_object[key].count = value.count;
        this.sen_summary_object[key].percent = value.percent;
      }
      let sortedObject = Object.entries(this.sen_summary_object).sort((a, b) => b[1].percent - a[1].percent);
      this.createBarChart(sortedObject);
      this.cdRef.detectChanges();
    }
    catch(e){
      console.log('Data row is null in initial load.,',e)
    }
    });

  }
  createBarChart(sortedObject: any) {
    let index = 0;
    for (let [key, {color, _, percent}] of sortedObject) {
      this.data[index] = percent;
      this.labels[index] = key + ' %';
      this.background[index] = color;
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