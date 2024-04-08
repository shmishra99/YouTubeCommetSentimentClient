import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private sharedData = new BehaviorSubject<Object>('');
  currentData = this.sharedData.asObservable();
  updateData(searchText:object): any {
    return this.sharedData.next(searchText);
  }

}
