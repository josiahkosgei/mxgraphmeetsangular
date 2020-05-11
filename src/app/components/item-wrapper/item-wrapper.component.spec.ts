import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWrapperComponent } from './item-wrapper.component';

describe('ItemWrapperComponent', () => {
  let component: ItemWrapperComponent;
  let fixture: ComponentFixture<ItemWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
