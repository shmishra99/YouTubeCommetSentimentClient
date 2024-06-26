import { Routes } from '@angular/router';
import { SentimentLandingComponent } from './sentiment-landing/sentiment-landing.component';
// import { authenticationGuardGuard } from './authentication-guard.guard';
import { authenticationGisGuard } from './authentication-gis.guard';
import { LoginGisComponent } from './login-gis/login-gis.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full',redirectTo: 'login'},
    { path: 'sentimentAnalysis',canActivate: [authenticationGisGuard],component: SentimentLandingComponent },
    { path: 'login' ,component: LoginGisComponent }
];