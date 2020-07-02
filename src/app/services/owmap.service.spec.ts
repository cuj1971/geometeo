import { TestBed } from '@angular/core/testing';

import { OWMapService } from './owmap.service';

describe('OWMapService', () => {
  let service: OWMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OWMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
