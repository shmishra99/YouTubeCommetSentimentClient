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
    console.log('line')
    console.log('line 14',searchText)
    return this.sharedData.next(searchText);
  }

}
