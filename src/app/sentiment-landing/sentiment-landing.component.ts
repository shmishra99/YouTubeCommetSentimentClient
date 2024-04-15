import { Component } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { OverviewComponent } from "./overview/overview.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { ListComponent } from "./list/list.component";
import { BackendApiResponse } from './interfaces/IBackendApiResponse';
import { SharedDataService } from './shared-data.service';

@Component({
    selector: 'app-sentiment-landing',
    standalone: true,
    templateUrl: './sentiment-landing.component.html',
    styleUrl: './sentiment-landing.component.scss',
    imports: [SearchBarComponent, OverviewComponent, PieChartComponent, ListComponent]
})
export class SentimentLandingComponent {

title = 'commentSentiment'
topCommentsData: string[] = []
botCommentsData: string[] = []
topCommentsTitle = 'Top Comments'
botCommentsTitle = 'Bottom Comments'
topBorderColor: string = 'rgba(52, 168, 83, 1)'
botBorderColor: string = 'rgba(234, 67, 53, 1)'
video_title: string = 'Video Title'
thumbnail_url: string = ''

constructor(private sharedDataService:SharedDataService){

}

ngOnInit() {
  this.sharedDataService.currentData.subscribe((data: any) => {
    if(!data)
      return
    const { top_comments, bot_comments, title, large_thumbnail_url } = data as BackendApiResponse
    this.topCommentsData = top_comments.map(item => item[0])
    this.botCommentsData = bot_comments.map(item => item[0])
    this.video_title = title
    this.thumbnail_url = large_thumbnail_url
  })
}

}


