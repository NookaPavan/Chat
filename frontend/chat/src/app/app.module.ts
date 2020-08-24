import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LboxNavComponent } from './lbox-nav/lbox-nav.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { SearchComponent } from './search/search.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { Main1Component } from './main1/main1.component';
import { Main2Component } from './main2/main2.component';
import { RcvMsgComponent } from './rcv-msg/rcv-msg.component';
import { SndMsgComponent } from './snd-msg/snd-msg.component';
import { WebService } from './services/web.service';
import { NotifyComponent } from './notify/notify.component';
import { AudioRecordingService } from './services/audioRec.service';

@NgModule({
  declarations: [
    AppComponent,
    LboxNavComponent,
    ChatListComponent,
    ConversationComponent,
    SearchComponent,
    NewChatComponent,
    Main1Component,
    Main2Component,
    RcvMsgComponent,
    SndMsgComponent,
    NotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    PickerModule,
    FormsModule
  ],
  providers: [WebService,AudioRecordingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
