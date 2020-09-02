import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { MockComponent } from 'ng2-mock-component';

import { BasketMiniComponent } from './basket-mini.component';
import { routes } from '../../../app-routing.module';
import { AppComponent } from '../../../app.component';
import { HomeComponent } from '../../../home/home.component';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { NgxsModule } from '@ngxs/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {LayoutModule} from "../../../layout/layout.module";
// import { NavbarComponent } from '../../../navbar/navbar.component';


describe('BasketMiniComponent', () => {
  let location: Location;
  let router: Router;
  let component: BasketMiniComponent;
  let fixture: ComponentFixture<BasketMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        MatToolbarModule
      ],
      declarations: [
        // BasketMiniComponent,
        AppComponent,
        HomeComponent,
        // BasketComponent,
        // NavbarComponent,
        MockComponent({ selector : 'app-product', inputs: ['item']}),
        MockComponent({ selector : 'app-category', inputs: ['category']}),
        MockComponent({selector: 'rt-alert'}),
        // RouterOutlet,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(BasketMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('navigate to "" redirects you to /home', fakeAsync(() => {
  //   router.navigate(['']);
  //   tick();
  //   expect(location.path()).toBe('/home');
  // }));
});
