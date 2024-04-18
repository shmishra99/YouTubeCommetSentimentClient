import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { validateToken } from '../authentication-gis.guard';
import { environment } from '../../environments/environment';
declare var google:any;

@Component({
  selector: 'app-login-gis',
  standalone: true,
  imports: [],
  templateUrl: './login-gis.component.html',
  styleUrl: './login-gis.component.scss'
})
export class LoginGisComponent {
  tokenClient:any
  ngOnInit():void{
    const CLIENT_ID = environment.CLIENT_ID
   const SCOPES = environment.SCOPES;



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
  constructor(private router:Router){

  }
  async gisAuthentication() {
     const d = new Date();
     const seconds = Math.round(d.getTime() / 1000);
     this.tokenClient.callback = async (resp:any) => {
       if (resp.error !== undefined) {
         alert('Error while authenticating the user.')
         this.router.navigateByUrl('/login')
        //  throw (resp);
       }
       const accessToken = resp.access_token;
       sessionStorage.setItem('access_token', accessToken);
       sessionStorage.setItem('refresh_at', String(seconds));
       //redirect to another middleware.
       this.router.navigateByUrl('/sentimentAnalysis')       
     };
     const refresh_at:number = sessionStorage.getItem('refresh_at') ? Number(sessionStorage.getItem('refresh_at')) : Number.MAX_SAFE_INTEGER;
     //Validate the token as well. along with client-id
     const stored_token = sessionStorage.getItem('access_token');
     const is_valid = refresh_at && (seconds - refresh_at) < 3550;
     const valid_token = stored_token ? await validateToken(stored_token) : false
     //validate the token as well. 
     if (is_valid && stored_token && valid_token) {
         this.router.navigateByUrl('/sentimentAnalysis')       
     }
     else {
       await this.tokenClient.requestAccessToken();
     }
  
    }
}