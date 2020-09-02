import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { MessagesState } from './messages.state';
import { AlertComponent } from './alert/alert.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MessageTypePipe } from './message-type.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    NgxsModule.forFeature([
      MessagesState,
    ]),
    MatButtonModule,
  ],
  declarations: [AlertComponent, MessageTypePipe],
  exports: [AlertComponent]
})
export class MessagesModule { }
