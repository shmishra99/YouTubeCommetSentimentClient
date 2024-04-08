import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatIconModule} from '@angular/material/icon';
import { SharedDataService } from './shared-data.service';
import { BackendApiResponse } from './interfaces/IBackendApiResponse';
import { OverviewComponent } from './overview/overview.component';
import { ListComponent } from './list/list.component';
// import { HttpClient } from '@angular/common/http'
// import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PieChartComponent,SearchBarComponent,MatIconModule,OverviewComponent,ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'commentSentiment'
  topCommentsData: string[] = []
  botCommentsData: string[] = []
  topCommentsTitle = 'Top Comments'
  botCommentsTitle = 'Bottom Comments'
  topBorderColor: string = 'rgba(52, 168, 83, 1)'
  botBorderColor: string = 'rgba(234, 67, 53, 1)'
  video_title: string = 'Video Title'
  thumbnail_url: string = ''

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.currentData.subscribe(data => {
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
