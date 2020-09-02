import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AuthService } from './auth.service';
import { AuthState } from './auth.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { RtFormsModule } from '../rt-forms/rt-forms.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import { ProfileComponent } from '../accounts/profile/profile.component';
import { EditprofileComponent } from '../accounts/editprofile/editprofile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { NotVerifiedComponent } from './not-verified/not-verified.component';
import { VerifiedGuard } from './guards';
import {RtScrollService} from "../rt-scroll/rt-scroll.service";
import { LayoutAuthLoginWrapperComponent } from '../layout/layout-auth-login-wrapper/layout-auth-login-wrapper.component';
import { LayoutAuthLoginFormComponent } from '../layout/layout-auth-login-form/layout-auth-login-form.component';
import { LayoutAuthRegistrationFormComponent } from '../layout/layout-auth-registration-form/layout-auth-registration-form.component';
import { LayoutAuthRegistrationWrapperComponent } from '../layout/layout-auth-registration-wrapper/layout-auth-registration-wrapper.component';
import { LayoutAuthNotVerifiedComponent } from '../layout/layout-auth-not-verified/layout-auth-not-verified.component';
import { LayoutAuthPasswordResetShapeComponent } from './../layout/layout-auth-password-reset-shape/layout-auth-password-reset-shape.component';
import { LayoutAuthPasswordResetCoverComponent } from './../layout/layout-auth-password-reset-cover/layout-auth-password-reset-cover.component';
import { LayoutAuthPasswordResetConfirmChangeComponent } from './../layout/layout-auth-password-reset-confirm-change/layout-auth-password-reset-confirm-change.component';
import { LayoutAuthPasswordResetConfirmCasingComponent } from './../layout/layout-auth-password-reset-confirm-casing/layout-auth-password-reset-confirm-casing.component';
import { LayoutAuthLogoutComponent } from './../layout/layout-auth-logout/layout-auth-logout.component';
import { LayoutAuthConfirmEmailComponent } from './../layout/layout-auth-confirm-email/layout-auth-confirm-email.component';
import { LayoutAuthConfirmEmailSendComponent } from './../layout/layout-auth-confirm-email-send/layout-auth-confirm-email-send.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {loginRoute: true},
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'password/reset/confirm/:uid/:token',
    component: PasswordResetConfirmComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'confirm-email/:key',
    component: ConfirmEmailComponent,
  },
  {
    path: 'not-verified',
    component: NotVerifiedComponent
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(AUTH_ROUTES),
    NgxsModule.forFeature([
      AuthState
    ]),
    FormsModule,
    ReactiveFormsModule,
    RtFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    AuthComponent,
    LogoutComponent,
    LoginComponent,
    RegistrationComponent,
    PasswordResetComponent,
    PasswordResetConfirmComponent,
    ConfirmEmailComponent,
    NotVerifiedComponent,
    LayoutAuthLoginFormComponent,
    LayoutAuthLoginWrapperComponent,
    LayoutAuthRegistrationFormComponent,
    LayoutAuthRegistrationWrapperComponent,
    LayoutAuthNotVerifiedComponent,
    LayoutAuthPasswordResetShapeComponent,
    LayoutAuthPasswordResetCoverComponent,
    LayoutAuthPasswordResetConfirmChangeComponent,
    LayoutAuthPasswordResetConfirmCasingComponent,
    LayoutAuthLogoutComponent,
    LayoutAuthConfirmEmailComponent,
    LayoutAuthConfirmEmailSendComponent
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    VerifiedGuard,
    RtScrollService,
  ],
  exports: [
    AuthComponent,
  ],
})
export class AuthModule { }
