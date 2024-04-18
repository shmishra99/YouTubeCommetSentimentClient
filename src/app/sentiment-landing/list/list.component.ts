import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent {
  @Input() listData: string[];
  @Input() title: string;
  @Input() borderColor: string = ''
  isTopComment;

  constructor() {
    this.listData = []; // Initialize with an empty array
    this.title = '';
    this.isTopComment = false
  }

  ngOnInit() {
    if (this.title == 'Top Comments') {

      this.isTopComment = true
    }
  }


}
