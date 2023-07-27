import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ENV_SERVER_URL } from './InjectionTokens/Env_Server_Url';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TokenAuthInterceptorFn } from './interceptor/httpinterceptor.service';
import { RetryInterceptorFn } from './interceptor/retryinterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([TokenAuthInterceptorFn, RetryInterceptorFn])),
    {
        provide: ENV_SERVER_URL,
        useValue: 'https://localhost:7203'
    },
    provideAnimations()]
};
