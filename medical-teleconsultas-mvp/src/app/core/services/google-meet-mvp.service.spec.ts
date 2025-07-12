import { TestBed } from '@angular/core/testing';

import { GoogleMeetMvpService } from './google-meet-mvp.service';

describe('GoogleMeetMvpService', () => {
  let service: GoogleMeetMvpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMeetMvpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
