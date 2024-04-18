import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SentimentLandingComponent } from './sentiment-landing/sentiment-landing.component';
import { SharedDataService } from './sentiment-landing/shared-data.service';
import { BackendApiResponse } from './sentiment-landing/interfaces/IBackendApiResponse';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SentimentLandingComponent]
})
export class AppComponent {
  title = 'YouTube Sentiment Analysis.';
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
