import { Component, HostBinding, AfterViewInit, AfterViewChecked, ChangeDetectorRef, OnInit, ChangeDetectionStrategy} from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { loadContent } from './app.animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    loadContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  title = 'frontend';
  isOpen = false;
  constructor(
    private cdRef: ChangeDetectorRef) {
    }

  ngAfterViewChecked() {
    this.cdRef.detectChanges(); }

  ngAfterViewInit() {
    this.isOpen = true;
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.animation;
  }
}
