import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitesComponent } from './websites.component';

describe('WebsitesComponent', () => {
  let component: WebsitesComponent;
  let fixture: ComponentFixture<WebsitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
