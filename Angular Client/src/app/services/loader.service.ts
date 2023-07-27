import { Injectable, WritableSignal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader:WritableSignal<boolean> = signal(false);
  public loader$ = toObservable(this.loader);

  constructor() { }

  start(){
    this.loader.set(true);
  }

  stop(){
    this.loader.set(false);
  }
}
