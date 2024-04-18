import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  initial_data:object = {
    "bot_comments": [],
    "large_thumbnail_url": "",
    "sentiment_summary": {
        "negative": {
            "count": 0,
            "percent": 0
        },
        "neutral": {
            "count": 0,
            "percent": 0
        },
        "positive": {
            "count": 0,
            "percent": 0
        },
        "undetermined": {
            "count": 0,
            "percent": 0
        }
    },
    "title": "",
    "top_comments": []
}
  private sharedData = new BehaviorSubject<Object>(this.initial_data);
  currentData = this.sharedData.asObservable();
  updateData(searchText:object): any {
    return this.sharedData.next(searchText);
  }

}
