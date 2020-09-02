import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { FlatpagesComponent } from './flatpages.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FlatpagesService } from '../service/flatpages.service';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Title, BrowserModule } from '@angular/platform-browser';
import { LoadFlatpages, LoadFlatpagesSuccess } from '../flatpages.action';
import { Flatpages } from '../models/flatpage';
import { FlatpagesStateModel } from '../flatpages.state';
import { Settings } from 'src/conf/settings';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const ABOUT_SINGLE_PAGE = {
  url: '/about/',
  title: 'About',
  content: 'Ok, it\'s about page here',
};

export const SOME_PAGE_STATE: FlatpagesStateModel = {
  pages : {
    About : ABOUT_SINGLE_PAGE,
  },
  currentPage: 'About',
};

const EXAMPLESTATE: FlatpagesStateModel = SOME_PAGE_STATE;

describe('FlatpagesComponent', () => {
  let component: FlatpagesComponent;
  let fixture: ComponentFixture<FlatpagesComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule, NgxsModule.forRoot()],
      declarations: [ FlatpagesComponent ],
      providers: [
        {
          provide: FlatpagesService, useValue: {}
        },
        {
          provide: ActivatedRoute,
          useValue: {params: of({flatpage: 'contacts'})},
        },
        Settings,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(FlatpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    store.reset({flatpages: EXAMPLESTATE});
  });

  it('should create', inject([Settings], (settings: Settings)  => {
    expect(component).toBeTruthy();
  }));

  // xit('setTitle method was called', async(() => {
  //   spyOn(component, 'setTitle');
  //   component.setTitle({});
  //   expect(component.setTitle).toHaveBeenCalled();
  // }));

  // xit('setTitle changed title', async(() => {
  //   const userService = TestBed.get(Title);
  //   component.setTitle({ 'title' : 'newTitle'});
  //   fixture.detectChanges();
  //   expect(userService.getTitle()).toBe('newTitle');
  // }));

  // xit(`setTitle doesn't change title to empty`, async(() => {
  //   const userService = TestBed.get(Title);
  //   component.setTitle({ 'title' : ''});
  //   fixture.detectChanges();
  //   expect(userService.getTitle()).not.toEqual('');
  // }));

  it('route was injected and result are right', () => {
    let result;
    const debugComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    debugComponent.route.params.subscribe(data => result = data);
    expect(result.flatpage).toBe('contacts');
  });



});
