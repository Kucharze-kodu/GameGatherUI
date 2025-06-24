import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSessionGamePageComponent } from './list-session-game-page.component';

describe('ListSessionGamePageComponent', () => {
  let component: ListSessionGamePageComponent;
  let fixture: ComponentFixture<ListSessionGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSessionGamePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSessionGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
