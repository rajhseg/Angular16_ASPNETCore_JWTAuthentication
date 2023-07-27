import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditauthorComponent } from './editauthor.component';

describe('EditauthorComponent', () => {
  let component: EditauthorComponent;
  let fixture: ComponentFixture<EditauthorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditauthorComponent]
    });
    fixture = TestBed.createComponent(EditauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
