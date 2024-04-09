declare var google:any;
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {CommentAnalysisService} from '../comment-analysis.service'
import {SharedDataService} from '../shared-data.service'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule,FormsModule,CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit{
  title = 'YouTube Sentiment Analysis.';
  searchText:any;
  inputValue:any
  tokenClient:any
  constructor(private commentAnalysisService:CommentAnalysisService,private sharedDataService:SharedDataService){
    
  }
  ngOnInit():void{
    const CLIENT_ID =
    '788168760496-hhftuahtts34vljarc3la277fjioh4g4.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/userinfo.profile';

  try {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      callback: '', // define later
      scope: SCOPES,
    });
  } catch (e) {
    console.log('Client library is Loading in backend.');
  }


  }
  
  async onSubmit(){
    console.log('Processing....')
    await this.handleAuthClick()
  }

  async youTubeSentimentBackend(access_token:string){
    console.log('Making call to youTubeSentimentBackend')
    this.commentAnalysisService.getData(this.searchText,access_token).subscribe(
      {
        next: (v) => {
          console.log("Fetched value",typeof v)
          this.sharedDataService.updateData(v)
        },
        error: (e) => {
          if(e.status == 401){
            alert('Authentication Failed or User is Invalid. Login Again')
            this.tokenClient.requestAccessToken();
            return
          }
          alert('Error while calling the Backend.' + e)
          console.log("error while calling api",e)
          throw e
        },
        complete: () => console.info('complete') 
      }
    );
  }

  /**
 *  Sign in the user upon submit button click.
 */
async handleAuthClick() {
  const d = new Date();
  const seconds = Math.round(d.getTime() / 1000);
  this.tokenClient.callback = async (resp:any) => {
    if (resp.error !== undefined) {
      alert('Error while authenticating the user.')
      throw (resp);
    }
    const accessToken = resp.access_token;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_at', String(seconds));
    this.youTubeSentimentBackend(accessToken)

  };
  const refresh_at:number = localStorage.getItem('refresh_at') ? Number(localStorage.getItem('refresh_at')) : Number.MAX_SAFE_INTEGER;
  //Validate the token as well.
  const stored_token = localStorage.getItem('access_token');
  const is_valid = refresh_at && (seconds - refresh_at) < 3550;
  if (is_valid && stored_token) {
    this.youTubeSentimentBackend(stored_token)
  }
  else {
    console.log('Calling token client.')
    let valid =  await this.tokenClient.requestAccessToken();
  }
}
  }

  // don't send true or false 2 time button click is fine. 
