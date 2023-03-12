/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroCompareService } from './hero-compare.service';

describe('Service: HeroCompare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroCompareService]
    });
  });

  it('should ...', inject([HeroCompareService], (service: HeroCompareService) => {
    expect(service).toBeTruthy();
  }));
});
