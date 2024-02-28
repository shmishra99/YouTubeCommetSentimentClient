import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentAnalysisService {

  private apiUrl = 'http://127.0.0.1:5001/api/analyze_video?url='; // Replace with your API endpoint

  constructor(private http: HttpClient) {

  }

  getData(searchText:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${searchText}`);
  }
}
