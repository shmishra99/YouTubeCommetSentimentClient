import { TestBed } from '@angular/core/testing';

import { CommentAnalysisService } from './comment-analysis.service';

describe('CommentAnalysisService', () => {
  let service: CommentAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
