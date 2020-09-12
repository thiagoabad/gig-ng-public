import { Component, OnInit } from '@angular/core';

import { EventEmitterService } from 'src/app/event-emitter.service';

@Component({
  selector: 'code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.css']
})
export class CodeDisplayComponent implements OnInit {

  code1: number;
  code2: number;
  gridNeedsRefresh = true;

  constructor(private eventEmitterService: EventEmitterService  ) {}

  ngOnInit() {   
    this.eventEmitterService.sharedCode1.subscribe(code1 => this.code1 = code1)
    this.eventEmitterService.sharedCode2.subscribe(code2 => this.code2 = code2)
    this.eventEmitterService.sharedGridNeedsRefresh.subscribe(gridNeedsRefresh => this.gridNeedsRefresh = gridNeedsRefresh)
  }

}
