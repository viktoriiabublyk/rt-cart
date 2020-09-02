import { TestBed, inject } from '@angular/core/testing';

import { RtScrollService } from './rt-scroll.service';
import { PageScrollService } from 'ngx-page-scroll-core';

describe('RtScrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RtScrollService, PageScrollService],
    });
  });

  it('should be created', inject([RtScrollService], (service: RtScrollService) => {
    expect(service).toBeTruthy();
  }));
});
