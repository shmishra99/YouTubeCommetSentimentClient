import { CanActivateFn, Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID, afterRender, inject } from '@angular/core';
import { LoginGisComponent } from './login-gis/login-gis.component';
import {environment} from '../environments/environment'


const CLIENT_ID = environment.CLIENT_ID 

let expire_storage_time:number
let stored_token:string


@Injectable({
  providedIn: 'root',
})
class PermissionsService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  }

  async canActivate() {
    const d = new Date();
    const seconds = Math.round(d.getTime() / 1000);
    console.log('line 15');

    try {
      console.log('Platform id', this.platformId)
      if(this.platformId == 'server')
        return true
      // console.log('line 12',  LoginGisComponent.getsessionStorage('refresh_at') )
      expire_storage_time = sessionStorage.getItem('refresh_at') ? Number(sessionStorage.getItem('refresh_at') ) : 1234;
      stored_token =  sessionStorage.getItem('access_token') ? String(sessionStorage.getItem('access_token')) : ''

      const refresh_at = expire_storage_time
      //Validate the token as well.
      console.log('line 12', refresh_at);
      console.log('Platform id', this.platformId)
      console.log('stored_token', stored_token);
      
      const is_valid = refresh_at && seconds - refresh_at < 3550;
      if (is_valid && stored_token) {
        let validation_response = await validateToken(stored_token);
        if (validation_response) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    } catch (e) {
      console.log('Somthing went wrong. Authentication throwing error.', e);
      return false;
    }
  }
}

export const authenticationGisGuard: CanActivateFn = async (route, state) => {
  let router = inject(Router);
  new PermissionsService('')
  const isAuth = await inject(PermissionsService).canActivate();
  console.log('line 47', isAuth);
  if (!isAuth) {
    console.log('line 49');
    router.navigateByUrl('/login');
    return isAuth;
  }
  console.log('authenticationGisGuard', isAuth);
  return isAuth;
};

/**
 *  Sign in the user upon submit button click.
 */
export async function validateToken(access_token: string) {
  const apiUrl = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='; // Replace with your API endpoint
  let result = await fetch(`${apiUrl}${access_token}`, {
    method: 'GET',
  });
  console.log('Reulst....', result);
  let response_json = await result.json();
  // add client id validation as well.
  console.log('response_json', response_json);
  if (response_json.expires_in > 10 && response_json.issued_to == CLIENT_ID) {
    return true;
  } else {
    return false;
  }
}
