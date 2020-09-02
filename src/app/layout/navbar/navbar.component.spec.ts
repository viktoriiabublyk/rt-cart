import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { FlatpagesService } from '../../flatpages/service/flatpages.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BasketModule } from '../../basket/basket.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SearchBlockComponent} from "../../rt-forms/search-block/search-block.component";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let flatpagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        BasketModule,
      ],
      declarations: [ NavbarComponent, SearchBlockComponent],
      providers: [

      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    flatpagesService = TestBed.get(FlatpagesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
