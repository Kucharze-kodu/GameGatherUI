import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionGamePageComponent } from './session-game-page.component';

describe('SessionGamePageComponent', () => {
  let component: SessionGamePageComponent;
  let fixture: ComponentFixture<SessionGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionGamePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
