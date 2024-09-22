import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  Input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() startMinutes = 14;
  @Input() startSeconds = 0;

  timerMinutes = 0;
  timerSeconds = 0;
  timerDisplay = '';
  private subscription: Subscription = new Subscription();

  progressValue = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.resetTimer();

    if (isPlatformBrowser(this.platformId)) {
      this.startTimer();
    }
  }

  private resetTimer(): void {
    this.timerMinutes = this.startMinutes;
    this.timerSeconds = this.startSeconds;
  }

  private startTimer(): void {
    const timer$ = interval(1000);
    this.subscription.add(
      timer$.subscribe(() => {
        this.incrementTimer();
        this.updateProgress();
        this.timerDisplay = `${this.pad(this.timerMinutes)}:${this.pad(
          this.timerSeconds
        )}`;
      })
    );
  }

  private incrementTimer(): void {
    if (this.timerMinutes === 14 && this.timerSeconds === 59) {
      this.timerMinutes = 14;
      this.timerSeconds = 0;
    } else if (this.timerSeconds === 59) {
      this.timerSeconds = 0;
      this.timerMinutes++;
    } else {
      this.timerSeconds++;
    }
  }

  private updateProgress(): void {
    const totalSecondsInOneMinute = 60;
    this.progressValue = (this.timerSeconds / totalSecondsInOneMinute) * 100;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
