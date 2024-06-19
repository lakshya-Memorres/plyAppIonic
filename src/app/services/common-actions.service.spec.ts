import { TestBed } from '@angular/core/testing';

import { CommonActionsService } from './common-actions.service';

describe('CommonActionsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CommonActionsService = TestBed.get(CommonActionsService);
        expect(service).toBeTruthy();
    });
});
