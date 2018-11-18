import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditTemplateComponent } from './client-edit-template.component';

describe('ClientEditTemplateComponent', () => {
  let component: ClientEditTemplateComponent;
  let fixture: ComponentFixture<ClientEditTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEditTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEditTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
