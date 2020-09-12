import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { EventEmitterService } from 'src/app/event-emitter.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService, private router: Router) { }

  ngOnInit() {
    this.eventEmitterService.sharedGrid.subscribe(grid => this.displayGrid = grid.reduce((acc, val) => acc.concat(val), []));
  }

  clickMessage = '';
  allowNewChar = false;
  displayGrid: string[] = [];
  grid: string[][] = [];
  timeLeft: number = 4;

  onClick(inputChar: string) {
      this.gridGenerator(inputChar);
      this.eventEmitterService.onCodeGeneratorButtonClick(this.grid);
      this.observableTimer();
  }

  gridGenerator(inputChar: string): void{
    this.grid = [];

    //TODO add timer to input
    if (inputChar === ""){
      for(let i: number = 0; i < 10; i++) {
        let array: string[] = [];
        for(let j: number = 0; j< 10; j++) {
          array.push(String.fromCharCode(97 + Math.floor(Math.random() * 26)));
        }
        this.grid.push(array);
      }
    } else {
      let tempGrid: string[] = [];
      // fill the first 80% of the array
      for (let i = 0; i < 80; i++) {
        let tempChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));

        //While to exclude the input char
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
      tempGrid = this.fisherYatesShuffle(tempGrid)

      // transform in a grid
      for(let i: number = 0; i < 100; i+=10) {
        this.grid.push(tempGrid.slice(i, i+10));
      }
    }

    //console.log(this.grid.reduce((acc, val) => acc.concat(val), []))
    this.displayGrid = this.grid.reduce((acc, val) => acc.concat(val), []);
    this.processGrid(this.grid);
    
  }

  fisherYatesShuffle(input: string[]){
    for(let i = input.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = input[i]
      input[i] = input[j]
      input[j] = temp
    }
    return input;
  }

  processGrid(grid: string[][]): void {

    let d = new Date();
    let seconds = d.getSeconds();
    let quotient = Math.floor(seconds/10);
    let remainder = seconds % 10;

    let cellValue1 = grid[quotient][remainder];
    let cellValue2 = grid[remainder][quotient];

    let code1stDigit = grid.map(x => x.filter(y => y === cellValue1).length).reduce((accumulator, currentValue) => accumulator + currentValue);
    let code2ndDigit = grid.map(x => x.filter(y => y === cellValue2).length).reduce((accumulator, currentValue) => accumulator + currentValue);

    this.eventEmitterService.nextCodes(this.reduceToOneDigit(code1stDigit), this.reduceToOneDigit(code2ndDigit), grid);

  }

  reduceToOneDigit(num: number, tries = 2){
    if (num < 10){
      return num
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

  observableTimer() {
    const source = timer(1000, 4000);
    source.subscribe(val => {
      this.allowNewChar = true;
      this.timeLeft = this.timeLeft - val;
    });
  }

  btnClick= function () {
    this.router.navigateByUrl('/payments');
  };
}
