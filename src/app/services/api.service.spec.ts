import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ENVIRONMENTS } from '../app-constants';

import { ApiService } from './api.service';
import { ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError, UnprocessableEntityError } from './api/errors';

describe('API Service', () => {
    let api: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ApiService
            ]
        }).compileComponents();
        api = TestBed.get(ApiService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(api).toBeTruthy();
    });

    it('should point to the production environment by default', () => {
        expect(api.environment.url).toBe(ENVIRONMENTS.PRODUCTION.url);
        expect(api.environment.url).not.toBe(ENVIRONMENTS.STAGING.url);
        expect(api.environment.url).not.toBe(ENVIRONMENTS.SANDBOX.url);
        expect(api.environment.url).not.toBe(ENVIRONMENTS.LOCAL.url);
    });

    it('should be switchable between different environments', () => {
        api.setEnvironment(ENVIRONMENTS.LOCAL);
        expect(api.endpoint).toBe(ENVIRONMENTS.LOCAL.url);

        api.setEnvironment(ENVIRONMENTS.SANDBOX);
        expect(api.endpoint).toBe(ENVIRONMENTS.SANDBOX.url);

        api.setEnvironment(ENVIRONMENTS.STAGING);
        expect(api.endpoint).toBe(ENVIRONMENTS.STAGING.url);

        api.setEnvironment(ENVIRONMENTS.PRODUCTION);
        expect(api.endpoint).toBe(ENVIRONMENTS.PRODUCTION.url);
    });

    it('should handle GET requests', async () => {
        api.get('/healthcheck').subscribe(response => {
            expect(response).toEqual({ ready: true });
        });

        const healthcheck = httpTestingController.expectOne(api.endpoint + '/healthcheck');
        expect(healthcheck.request.method).toBe('GET');
        healthcheck.flush({ ready: true });
    });

    it('should handle POST requests', async () => {
        api.post('/login', {
            email: 'test@liveherelovehere.app',
            password: 'Testing123'
        }).subscribe(response => {
            expect(response).toEqual({ success: true });
        });

        const healthcheck = httpTestingController.expectOne(api.endpoint + '/login');
        expect(healthcheck.request.method).toBe('POST');
        expect(JSON.parse(healthcheck.request.body)).toEqual({
            email: 'test@liveherelovehere.app',
            password: 'Testing123'
        });
        healthcheck.flush({ success: true });
    });

    it('should cast 401 errors to UnauthorizedError', async () => {
        api.get('/testing').subscribe(() => null, (error: UnauthorizedError) => {
            expect(error instanceof UnauthorizedError).toBeTruthy('Not an instance of UnauthorizedError');
            expect(error.message).toBe('You are unauthorized');
        });

        const request = httpTestingController.expectOne(api.endpoint + '/testing');
        request.flush({ message: 'You are unauthorized' }, { status: 401, statusText: 'Unauthorized' });
    });

    it('should cast 403 errors to ForbiddenError', async () => {
        api.get('/testing').subscribe(() => null, (error: ForbiddenError) => {
            expect(error instanceof ForbiddenError).toBeTruthy('Not an instance of ForbiddenError');
            expect(error.message).toBe('Access is forbidden');
        });

        const request = httpTestingController.expectOne(api.endpoint + '/testing');
        request.flush({ message: 'Access is forbidden' }, { status: 403, statusText: 'Forbidden' });
    });

    it('should cast 404 errors to NotFoundError', async () => {
        api.get('/testing').subscribe(() => null, (error: NotFoundError) => {
            expect(error instanceof NotFoundError).toBeTruthy('Not an instance of NotFoundError');
            expect(error.message).toBe('Item not found');
        });

        const request = httpTestingController.expectOne(api.endpoint + '/testing');
        request.flush({ message: 'Item not found' }, { status: 404, statusText: 'Not Found' });
    });

    it('should cast 422 errors to UnprocessableEntityError', async () => {
        api.get('/testing').subscribe(() => null, (error: UnprocessableEntityError) => {
            expect(error instanceof UnprocessableEntityError).toBeTruthy('Not an instance of UnprocessableEntityError');
            expect(error.message).toBe('The data provided could not be processed');
        });

        const request = httpTestingController.expectOne(api.endpoint + '/testing');
        request.flush({ message: 'The data provided could not be processed' }, { status: 422, statusText: 'Unprocessable Entity' });
    });

    it('should cast 500 errors to InternalServerError', async () => {
        api.get('/testing').subscribe(() => null, (error: InternalServerError) => {
            expect(error instanceof InternalServerError).toBeTruthy('Not an instance of InternalServerError');
            expect(error.message).toBe('An internal server error occurred');
        });

        const request = httpTestingController.expectOne(api.endpoint + '/testing');
        request.flush({ message: 'An internal server error occurred' }, { status: 500, statusText: 'Internal Server Error' });
    });

    it('should not include the Authorization header when no token is set', () => {
        api.get('/testing').subscribe();
        const get = httpTestingController.expectOne(api.endpoint + '/testing');
        expect(get.request.method).toBe('GET');
        expect(get.request.headers.keys()).not.toContain('Authorization');
        get.flush({ success: true });

        api.post('/post-request', { testing: true }).subscribe();
        const post = httpTestingController.expectOne(api.endpoint + '/post-request');
        expect(post.request.method).toBe('POST');
        expect(post.request.headers.keys()).not.toContain('Authorization');
        post.flush({ success: true });
    });

    it('should include the Authorization header when is set', () => {
        api.setToken('api_token_success');

        api.get('/get-request').subscribe();
        const get = httpTestingController.expectOne(api.endpoint + '/get-request');
        expect(get.request.method).toBe('GET');
        expect(get.request.headers.keys()).toContain('Authorization');
        expect(get.request.headers.get('Authorization')).toBe('Bearer api_token_success');
        get.flush({ success: true });

        api.post('/post-request', { testing: true }).subscribe();
        const post = httpTestingController.expectOne(api.endpoint + '/post-request');
        expect(post.request.method).toBe('POST');
        expect(post.request.headers.keys()).toContain('Authorization');
        expect(post.request.headers.get('Authorization')).toBe('Bearer api_token_success');
        post.flush({ success: true });
    });
});
