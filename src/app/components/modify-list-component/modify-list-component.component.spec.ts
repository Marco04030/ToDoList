import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyListComponentComponent } from './modify-list-component.component';

describe('ModifyListComponentComponent', () => {
  let component: ModifyListComponentComponent;
  let fixture: ComponentFixture<ModifyListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
