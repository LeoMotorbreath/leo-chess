import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchResultModalComponent } from './match-result-modal.component';

describe('MatchResultModalComponent', () => {
  let component: MatchResultModalComponent;
  let fixture: ComponentFixture<MatchResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
