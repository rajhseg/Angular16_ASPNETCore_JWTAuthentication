import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbookComponent } from './editbook.component';

describe('EditbookComponent', () => {
  let component: EditbookComponent;
  let fixture: ComponentFixture<EditbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditbookComponent]
    });
    fixture = TestBed.createComponent(EditbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
