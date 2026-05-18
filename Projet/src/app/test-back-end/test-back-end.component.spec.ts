import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBackEndComponent } from './test-back-end.component';

describe('TestBackEndComponent', () => {
  let component: TestBackEndComponent;
  let fixture: ComponentFixture<TestBackEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestBackEndComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBackEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
