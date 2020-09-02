import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CatalogModule } from './catalog/catalog.module';
import { HomeComponent } from './home/home.component';
import { RtFormsModule } from './rt-forms/rt-forms.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthState } from './auth';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';
import { FlatpagesModule } from './flatpages/flatpages.module';
import {Settings} from '../conf/settings';
import {settings} from '../environments/environment';
import { BasketModule } from './basket/basket.module';
import { AuthService } from './auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthErrorInterceptor } from './auth/interceptors';
import { CSRFInterceptor } from './interceptors/csrf-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataParamsRouterStateSerializer } from './route-state/serializers';
import { MatIconModule } from '@angular/material/icon';
import { MessagesModule } from './messages/messages.module';
import { LayoutModule } from './layout/layout.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from './services/user.service';
import {RtScrollModule} from './rt-scroll/rt-scroll.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    CatalogModule,
    RtFormsModule,
    FlatpagesModule,
    BasketModule,
    NgxsModule.forRoot([AuthState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MessagesModule,
    MatIconModule,
    MatToolbarModule,
    RtScrollModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CSRFInterceptor,
      multi: true,
    },
    AuthService,
    UserService,
    CookieService,
  { provide: Settings, useValue: settings },
  { provide: RouterStateSerializer, useClass: DataParamsRouterStateSerializer },
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
