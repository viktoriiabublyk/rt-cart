import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Settings } from 'src/conf/settings';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
      ],
      declarations: [ AddComponent, ],
      providers: [ Settings, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([Settings], (settings: Settings)  => {
    expect(component).toBeTruthy();
  }));
});
