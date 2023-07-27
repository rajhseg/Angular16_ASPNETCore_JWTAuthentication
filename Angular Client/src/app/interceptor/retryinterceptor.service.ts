import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, RetryConfig, delay, retry, timer } from 'rxjs';

export function RetryInterceptorFn(req: HttpRequest<unknown>, next:HttpHandlerFn){

  function shouldRetry(error: HttpErrorResponse) {
   
    if (error) {
      return timer(1000); 
    }

    throw error;
  };

  var config: RetryConfig = {delay:shouldRetry, count:3};
  return next(req).pipe(retry(config));
}