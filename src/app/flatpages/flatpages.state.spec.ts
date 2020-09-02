import { FlatpagesStateModel, FlatpagesState } from './flatpages.state';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FlatpagesComponent } from './flatpages/flatpages.component';
import { FlatpagesService } from './service/flatpages.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LoadFlatpagesSuccess, LoadFlatpages, LoadFlatpagesData } from './flatpages.action';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {settings} from '../../environments/environment';
import { Settings } from 'src/conf/settings';


export const ABOUT_SINGLE_PAGE = {
    url: '/about/',
    title: 'About',
    content: 'Ok, it\'s about page here',
};

export const CONTACTS_SINGLE_PAGE = {
    url: '/contacts/',
    title: 'contacts',
    content: 'Ok, it\'s contacts page here',
};

export const SOME_PAGE_STATE: FlatpagesStateModel = {
    pages : {
        About : ABOUT_SINGLE_PAGE,
    },
    currentPage: 'About',
};

const EXAMPLESTATE: FlatpagesStateModel = SOME_PAGE_STATE;

describe('FlatpagesState', () => {
    let store: Store;
    let flatpagesService;

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [ NgxsModule.forRoot([FlatpagesState]), HttpClientTestingModule],
            providers: [
            {provide: Settings, useValue: settings},
            ]
        }).compileComponents();

        store = TestBed.get(Store);
        store.reset({flatpages: EXAMPLESTATE});

        flatpagesService = TestBed.get(FlatpagesService);
    }));

    it('should test the action LoadCatalogSuccess', fakeAsync(() => {
        store.dispatch(new LoadFlatpagesSuccess(CONTACTS_SINGLE_PAGE, 'contacts'));
        tick();
        const state = store.snapshot();
        expect(state.flatpages.pages[state.flatpages.currentPage]).toEqual(CONTACTS_SINGLE_PAGE);
    }));

});
