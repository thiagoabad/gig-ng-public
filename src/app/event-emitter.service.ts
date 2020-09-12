import { Injectable, EventEmitter } from '@angular/core';    
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeCodeDisplayFunction = new EventEmitter();    
  subsVar: Subscription;    
  private code1 = new BehaviorSubject(0);
  private code2 = new BehaviorSubject(0);
  private gridNeedsRefresh = new BehaviorSubject(true);
  private grid: string[][] = [];
  private gridBS = new BehaviorSubject(this.grid);
  sharedCode1 = this.code1.asObservable();
  sharedCode2 = this.code2.asObservable();
  sharedGridNeedsRefresh = this.gridNeedsRefresh.asObservable();
  sharedGrid = this.gridBS.asObservable();

  constructor() { }    
    
  onCodeGeneratorButtonClick(grid: string[][]) {  
    this.invokeCodeDisplayFunction.emit(grid);    
  }

  nextCodes(code1: number, code2: number, grid: string[][]) {
    this.code1.next(code1);
    this.code2.next(code2);
    this.gridBS.next(grid);
    this.gridNeedsRefresh.next(false);
  }
} 