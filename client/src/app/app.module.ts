import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChatService} from '../chat-service';
import {FormsModule} from '@angular/forms';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
