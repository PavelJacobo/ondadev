import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiProgramaComponent } from './mi-programa.component';

describe('MiProgramaComponent', () => {
  let component: MiProgramaComponent;
  let fixture: ComponentFixture<MiProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
