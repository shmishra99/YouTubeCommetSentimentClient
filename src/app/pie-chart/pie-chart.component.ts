import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import {SharedDataService} from '../shared-data.service'


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent {
     
  title = 'ng-chart';
  chart: any = [];
  data:any = [0,0,0,0]
  sen_analysis_object:any = {    
    "negative_count": 0,
    "neutral_count":0,
    "positive_count":0,
   "undetermined_count":0

  }
  constructor(private sharedDataService:SharedDataService) {

  }
  

  ngOnInit() {
    
    this.sharedDataService.currentData.subscribe(data =>{  
     console.log(typeof this.chart)
        
     if(data){
      this.chart.destroy();
     }

      console.log('line 42222',data)
      this.sen_analysis_object = data
      this.data[0] = this.sen_analysis_object.negative_count
      this.data[1] = this.sen_analysis_object.neutral_count
      this.data[2] = this.sen_analysis_object.positive_count
      this.data[3] = this.sen_analysis_object.undetermined_count
      console.log('line 38',this.data)
      if(data == undefined) {
         
      }
      // this.data = data
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: ['negative_count', 'neutral_count', 'positive_count', 'undetermined_count'],
          datasets: [
            {
              label: 'sentiment',
              data:this.data,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // this.chart.destroy();

    
    });
   


  }

}
