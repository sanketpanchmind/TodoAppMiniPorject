import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursorFollowerComponent } from './cursor-follower.component';

describe('CursorFollowerComponent', () => {
  let component: CursorFollowerComponent;
  let fixture: ComponentFixture<CursorFollowerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursorFollowerComponent]
    });
    fixture = TestBed.createComponent(CursorFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
