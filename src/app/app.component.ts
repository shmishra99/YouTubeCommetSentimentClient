import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ListComponent } from './list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedDataService } from './shared-data.service'
import { BackendApiResponse } from './interfaces/IBackendApiResponse';
// import { HttpClient } from '@angular/common/http'
// import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PieChartComponent,SearchBarComponent,ListComponent,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'commentSentiment'
  topCommentsData: string[] = []
  botCommentsData: string[] = []
  topCommentsTitle = 'Top Comments'
  botCommentsTitle = 'Bottom Comments'

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.currentData.subscribe(data => {
      const { top_comments, bot_comments } = data as BackendApiResponse
      this.topCommentsData = top_comments.map(item => item[0])
      this.botCommentsData = bot_comments.map(item => item[0])
    })
  }
}
