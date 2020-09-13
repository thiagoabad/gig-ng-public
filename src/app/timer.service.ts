import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';

@Injectable({    
    providedIn: 'root'    
  })
export class TimerService {

    private timer = timer(0, 1000);
    private tick = 0;
    private lastGen = -10;
    private lastChar = -4;
    private started = false;

    private live = new BehaviorSubject(false);
    setLive= this.live.asObservable();
    private charReadOnly = new BehaviorSubject(false);
    setCharReadOnly= this.charReadOnly.asObservable();


    constructor(){}

    startClock() {

        if (this.started) return
        this.timer.subscribe(() => {
            ++this.tick;
            // Timer to allow new char
            if (this.tick - this.lastChar >= 4) this.charReadOnly.next(false);
            // Timer to kill code
            if (this.tick - this.lastGen >= 10) this.live.next(false);
        });
        this.started = true;
    }

    nextLive(live: boolean) {
        this.live.next(live);
        this.lastGen = this.tick;
    }

    nextCharReadOnly(charReadOnly: boolean) {
        this.charReadOnly.next(charReadOnly);
        this.lastChar = this.tick;
    }
}