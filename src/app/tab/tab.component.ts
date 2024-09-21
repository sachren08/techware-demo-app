import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements OnInit, OnDestroy {
  activeTabIndex = 0;
  tabCount = 3;
  subscription: Subscription = new Subscription();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSwitching();
    }
  }

  startAutoSwitching() {
    const tabSwitching$ = interval(5000);
    this.subscription.add(
      tabSwitching$.subscribe(() => {
        this.activeTabIndex = (this.activeTabIndex + 1) % this.tabCount;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
