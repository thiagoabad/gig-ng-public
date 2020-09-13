import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/storage.service';
import { TimerService } from 'src/app/timer.service';

@Component({
  selector: 'app-code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.css']
})
export class CodeDisplayComponent implements OnInit {

  code1: number;
  code2: number;
  live: boolean;

  constructor(private storageService: StorageService, private timer: TimerService  ) {}

  ngOnInit(): void {
    this.storageService.sharedCode1.subscribe(code1 => this.code1 = code1);
    this.storageService.sharedCode2.subscribe(code2 => this.code2 = code2);
    this.timer.setLive.subscribe(live => this.live = live);
  }

}
