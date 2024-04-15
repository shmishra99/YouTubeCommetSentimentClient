import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})

export class OverviewComponent {
  @Input() video_title: string;
  @Input() thumbnail_url: string;

  constructor() {
    this.video_title = '';
    this.thumbnail_url = '';
  }
}
