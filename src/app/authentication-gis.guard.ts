import { CanActivateFn,Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
const CLIENT_ID =
'788168760496-hhftuahtts34vljarc3la277fjioh4g4.apps.googleusercontent.com';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {
 async canActivate(): Promise<boolean> {
    // let router = inject(Router)
  const d = new Date();
  const seconds = Math.round(d.getTime() / 1000);
  console.log('line 12',  sessionStorage.getItem('refresh_at') )
  try{
  let expire_storage_time =  sessionStorage.getItem('refresh_at') 
  const refresh_at:number = expire_storage_time ? Number(expire_storage_time) : 1234
  //Validate the token as well.
  console.log('line 12',refresh_at)
  const stored_token = sessionStorage.getItem('access_token');
  console.log('stored_token',stored_token)
  const is_valid = refresh_at && (seconds - refresh_at) < 3550;
  if (is_valid && stored_token) {
    let validation_response =  await validateToken(stored_token)
     if(validation_response){
        return true
     }
    // router.navigateByUrl('/login')
    return false

  }
  else {
    // router.navigateByUrl('/login')
    return false
  }
}
catch(e){
  console.log('Somthing went wrong. Authentication throwing error.')
  // router.navigateByUrl('/login')
  return false
}

  }

}

export const authenticationGisGuard: CanActivateFn = async (route, state) => {
  console.log('authenticationGisGuard',inject(PermissionsService).canActivate())
  return inject(PermissionsService).canActivate();
}

/**
 *  Sign in the user upon submit button click.
 */
export async function validateToken(access_token:string){
  const apiUrl = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='; // Replace with your API endpoint
  let result = await fetch(`${apiUrl}${access_token}`, {
		method: 'GET',
	})
  console.log('Reulst....',result)
  let response_json = await result.json()
  // add client id validation as well. 
  console.log('response_json',response_json)
  if(response_json.expires_in > 10 && response_json.issued_to == CLIENT_ID ){
     return true
  }
  else {
   return false
  }
}