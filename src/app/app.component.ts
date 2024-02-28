import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatIconModule} from '@angular/material/icon';
// import { HttpClient } from '@angular/common/http'
// import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PieChartComponent,SearchBarComponent,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'commentSentiment';
}
