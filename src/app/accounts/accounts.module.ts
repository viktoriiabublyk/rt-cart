import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AuthState, AuthModule, VerifiedGuard } from '../auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RtFormsModule } from '../rt-forms/rt-forms.module';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AuthService } from '../auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'profile',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: 'edit',
        component: EditprofileComponent,
      },
      {
        path: 'delete',
      }
    ],
    canActivate: [VerifiedGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ACCOUNT_ROUTES),
    NgxsModule.forFeature([AuthState]),
    NgxsRouterPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RtFormsModule,
    AuthModule,
  ],
  providers: [AuthService],
  declarations: [
    AccountComponent,
    ProfileComponent,
    EditprofileComponent],
  exports: [
  ]
})
export class AccountsModule { }
