import {Injectable, Inject, EventEmitter} from '@angular/core';

import {DOCUMENT} from '@angular/common';
import {PageScrollService} from 'ngx-page-scroll-core';
import {Subject, timer} from 'rxjs';


@Injectable()
export class RtScrollService {

  protected currentElementSource = new Subject();
  currentElement$ = this.currentElementSource.asObservable();
  localCurrentElement = '';
  private defaultOffset = 60;
  idsMap: string[] = [];
  public moveToElement: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: Document,

  ) {}


  onScroll() {
    for (const id of this.idsMap) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        const bottom = el.getBoundingClientRect().top + el.offsetHeight;
        if (top <= 150 && bottom > 100) {
          if (id && id !== this.localCurrentElement) {
            this.setCurrentElement(id);
          }
        }
      }
    }
  }

  /**
   * Scroll the page to the element
   * @param id
   * @param {boolean} accurat If accuracy is needed we are making the second attempt to achieve the id
   */
  toId(id, accurat = true) {
    if (!id) {
      return false;
    }
    const options = {
      document: this.document,
      scrollTarget: '#' + id,
      scrollOffset: this.defaultOffset,
      verticalScrolling: true,
      advancedInlineOffsetCalculation: true,
    };

    if (accurat) {
      const finished = new EventEmitter<boolean>();
      finished.subscribe(() => this.toId(id, false));
      options['pageScrollFinishListener'] = finished;
    }

    timer(0).subscribe(
      () => this.pageScrollService.scroll(options)
    );
  }

  toClass(className) {
    const options = {
      document: this.document,
      scrollTarget: '.' + className,
      scrollOffset: 100 + this.defaultOffset,
      verticalScrolling: true,
    };
    timer(0).subscribe(
      () => this.pageScrollService.scroll(options)
    );
  }

  toTarget(target) {
    const options = {
      document: this.document,
      scrollTarget: target,
      scrollOffset: 100 + this.defaultOffset,
      verticalScrolling: true,
    };
    timer(0).subscribe(
      () => this.pageScrollService.scroll(options)
    );
  }

  toIdInContainer(id, containerId, defOffset?: number, scrollTarget?) {
    const options = {
      document: this.document,
      scrollTarget: scrollTarget ? scrollTarget : '#' + id,
      scrollViews: [this.document.getElementById(containerId)],
      verticalScrolling: true,
      advancedInlineOffsetCalculation: true,
      scrollOffset: defOffset,
    };
    timer(0).subscribe(
      () => this.pageScrollService.scroll(options)
    );
  }

  /**
   * Scroll the parent element until child element become visible (if they exist)
   * @param childId
   * @param parentId
   * @returns {boolean} true, if parent element is not exists, null if child element is not exists, otherwise false
   */
  scrollIfNotVisible(childId, parentId): boolean {
    const childElement = this.document.getElementById(childId);
    const parentElement = this.document.getElementById(parentId);

    if (!parentElement) {
      return true;
    }

    if (!childElement) {
      return null;
    }
    if (childElement.getBoundingClientRect().top > parentElement.offsetHeight) {
      this.toIdInContainer(childId, parentId);
    }
    return false;
  }

  scrollHierarchy(childId, parentId): boolean {
    const childElement = this.document.getElementById(childId);
    const parentElement = this.document.getElementById(parentId);
    if (!parentElement) {
      return true;
    }

    if (!childElement) {
      return null;
    }
    const top = childElement.getBoundingClientRect().top;
    if (top < parentElement.getBoundingClientRect().top || top > parentElement.getBoundingClientRect().bottom) {
      this.toIdInContainer(childId, parentId, this.defaultOffset, childElement);
    }
    return false;
  }

  setCurrentElement(id) {
    this.localCurrentElement = id;
    this.currentElementSource.next(id);
  }
}
