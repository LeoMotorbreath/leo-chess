import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInitModalComponent } from './game-init-modal.component';

describe('GameInitModalComponent', () => {
  let component: GameInitModalComponent;
  let fixture: ComponentFixture<GameInitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameInitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
