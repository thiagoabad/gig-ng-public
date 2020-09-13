import { Injectable } from '@angular/core';    
import { BehaviorSubject } from 'rxjs'; 
    
@Injectable({    
  providedIn: 'root'    
})    
export class StorageService {    
      
  private code1 = new BehaviorSubject(0);
  private code2 = new BehaviorSubject(0);
  private live = new BehaviorSubject(true);
  private grid: string[][] = [];
  private gridBS = new BehaviorSubject(this.grid);
  sharedCode1 = this.code1.asObservable();
  sharedCode2 = this.code2.asObservable();
  sharedLive= this.live.asObservable();
  sharedGrid = this.gridBS.asObservable();

  constructor() { }    

  nextCodes(code1: number, code2: number, grid: string[][]) {
    this.code1.next(code1);
    this.code2.next(code2);
    this.gridBS.next(grid);
    this.live.next(false);
  }

  nextLive(live: boolean) {
    this.live.next(live);
  }
} 