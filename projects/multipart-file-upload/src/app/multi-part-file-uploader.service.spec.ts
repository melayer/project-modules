import { TestBed } from '@angular/core/testing';

import { MultiPartFileUploaderService } from './multi-part-file-uploader.service';

describe('MultiPartFileUploaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiPartFileUploaderService = TestBed.get(MultiPartFileUploaderService);
    expect(service).toBeTruthy();
  });
});
