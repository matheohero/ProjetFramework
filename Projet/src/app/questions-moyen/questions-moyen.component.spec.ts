import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsMoyenComponent } from './questions-moyen.component';

describe('QuestionsMoyenComponent', () => {
  let component: QuestionsMoyenComponent;
  let fixture: ComponentFixture<QuestionsMoyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsMoyenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
