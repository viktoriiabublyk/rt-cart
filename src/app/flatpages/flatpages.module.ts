import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlatpagesComponent } from './flatpages/flatpages.component';
import { NgxsModule } from '@ngxs/store';
import { FlatpagesState } from './flatpages.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forFeature([
      FlatpagesState,
    ]),
  ],
  declarations: [FlatpagesComponent]
})
export class FlatpagesModule { }
