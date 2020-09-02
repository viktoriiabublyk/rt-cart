import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng2-mock-component';
import {RouterTestingModule} from '@angular/router/testing';
import { LayoutModule } from './layout/layout.module';
import { NgxsModule } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AppComponent', () => {

beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        MockComponent({selector: 'app-navbar'}),
        MockComponent({selector: 'rt-alert'}),
      ],
      providers: [
      ]
    }).compileComponents();
  }));

beforeEach(() => {

  });

it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
it(`should have as title 'frontend'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('frontend');
  }));
it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.page_inner')).toBeTruthy();
  }));
});
