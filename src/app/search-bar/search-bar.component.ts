import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
import {CommentAnalysisService} from '../comment-analysis.service'
import {SharedDataService} from '../shared-data.service'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule,FormsModule,CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  title = 'YouTube Sentiment Analysis.';
  searchText:any;
  inputValue:any
  constructor(private commentAnalysisService:CommentAnalysisService,private sharedDataService:SharedDataService){

  }

  onSubmit(){
    console.log('Processing....')
    this.commentAnalysisService.getData(this.searchText).subscribe(
             {
              next: (v) => {
                console.log("Fetched value",typeof v)
                this.sharedDataService.updateData(v)
              },
              error: (e) => {
                alert('Error while calling the Backend.' + e)
                console.error(e)
                throw e
              
              },
              complete: () => console.info('complete') 
             }
    );
  }
  }
