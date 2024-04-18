declare var google:any;
import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common'
import { HttpClient } from '@angular/common/http';
import {CommentAnalysisService} from '../comment-analysis.service'
import {SharedDataService} from '../shared-data.service'
import { environment } from '../../../environments/environment';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconModule,FormsModule,CommonModule,MatFormFieldModule, MatInputModule, MatButtonModule],
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
  const CLIENT_ID = environment.CLIENT_ID
  const SCOPES = environment.SCOPES


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
    if(this.searchText == ''){
      alert('Entered URL is not valid.')
       return
    }
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
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_at', String(seconds));
    this.youTubeSentimentBackend(accessToken)

  };
  const refresh_at:number = sessionStorage.getItem('refresh_at') ? Number(sessionStorage.getItem('refresh_at')) : Number.MAX_SAFE_INTEGER;
  //Validate the token as well.
  const stored_token = sessionStorage.getItem('access_token');
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