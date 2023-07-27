import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddauthorComponent } from './addauthor.component';

describe('AddauthorComponent', () => {
  let component: AddauthorComponent;
  let fixture: ComponentFixture<AddauthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddauthorComponent]
    });
    fixture = TestBed.createComponent(AddauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
