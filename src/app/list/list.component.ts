import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent {
  @Input() listData: string[];
  @Input() title: string;

  constructor() {
    this.listData = []; // Initialize with an empty array
    this.title = '';
  }
}
