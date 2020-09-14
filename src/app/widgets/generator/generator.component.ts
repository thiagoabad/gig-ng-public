import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { StorageService } from 'src/app/storage.service';
import { TimerService } from 'src/app/timer.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  clickMessage = '';
  charReadOnly = false;
  displayGrid: string[] = [];
  grid: string[][] = [];
  debounce: Subject<string> = new Subject<string>();
  inputChar = '';

  constructor(private storageService: StorageService, private timer: TimerService) { }

  ngOnInit(): void {
    this.storageService.sharedGrid.subscribe(grid => this.displayGrid = grid.reduce((acc, val) => acc.concat(val), []));
    this.timer.setCharReadOnly.subscribe(charReadOnly => this.charReadOnly = charReadOnly);
    this.timer.invokeRefreshGrid.subscribe(() => {
        this.gridGenerator(this.inputChar);
    });
    this.timer.nextLive(false);
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(inputChar => this.gridGenerator(inputChar));
    this.timer.startClock();
    if (!this.displayGrid.length) {
      for (let i = 0; i < 100; i++) {
        this.displayGrid.push('a');
      }
    }
  }

  gridGenerator(inputChar: string): void{
    this.timer.nextLive(true);

    this.grid = [];

    if (inputChar === ''){
      for (let i = 0; i < 10; i++) {
        const array: string[] = [];
        for (let j = 0; j < 10; j++) {
          array.push(String.fromCharCode(97 + Math.floor(Math.random() * 26)));
        }
        this.grid.push(array);
      }
    } else {
      this.timer.nextCharReadOnly(true);

      let tempGrid: string[] = [];
      // fill the first 80% of the array
      for (let i = 0; i < 80; i++) {
        let tempChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));

        // while to exclude the input char
        while (tempChar === inputChar) {
          tempChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
        tempGrid.push(tempChar);
      }
      // fill the rest 20% of the array
      for (let i = 0; i < 20; i++) {
        tempGrid.push(inputChar);
      }
      // shuffle the array
      tempGrid = this.fisherYatesShuffle(tempGrid);

      // transform in grid
      for (let i = 0; i < 100; i += 10) {
        this.grid.push(tempGrid.slice(i, i + 10));
      }
    }

    this.displayGrid = this.grid.reduce((acc, val) => acc.concat(val), []);
    this.processGrid(this.grid);
  }

  fisherYatesShuffle(input: string[]): string[] {
    for (let i = input.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i);
      const temp = input[i];
      input[i] = input[j];
      input[j] = temp;
    }
    return input;
  }

  processGrid(grid: string[][]): void {

    const d = new Date();
    const seconds = d.getSeconds();
    const quotient = Math.floor(seconds / 10);
    const remainder = seconds % 10;

    const cellValue1 = grid[quotient][remainder];
    const cellValue2 = grid[remainder][quotient];

    const code1stDigit = grid.map(x => x.filter(y => y === cellValue1).length)
                              .reduce((accumulator, currentValue) => accumulator + currentValue);
    const code2ndDigit = grid.map(x => x.filter(y => y === cellValue2).length)
                              .reduce((accumulator, currentValue) => accumulator + currentValue);

    this.storageService.nextCodes(this.reduceToOneDigit(code1stDigit), this.reduceToOneDigit(code2ndDigit), grid);

  }

  reduceToOneDigit(num: number, tries = 2): number{
    if (num < 10){
      return num;
    } else{
      let res = num / tries;
      res = Math.ceil(res);
      if (res < 10){
        return res;
      } else {
        return this.reduceToOneDigit(num, ++tries);
      }
    }
  }

}
