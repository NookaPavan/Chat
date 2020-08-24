import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { AudioRecordingService } from '../services/audioRec.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-conversation',
  template: `
        <div class="row message" id="conversation" (click)="ClickedOut($event)">
          <div class="row message-previous">
            <div class="col-sm-12 previous">
              <a onclick="previous(this)" id="ankitjain28" name="20">
              Show Previous Message!
              </a>
            </div>
          </div>
          
          <ng-container *ngFor= 'let message of rcvmsgs'>
            <ng-template [ngIf]= "message.status" [ngIfElse]="msg">
              <app-notify [msg]=message></app-notify>
            </ng-template>

            <ng-template #msg>
              <ng-template [ngIf]="checkUser(message.name)" [ngIfElse]="sndMsg">
                <app-rcv-msg  [msg]= message></app-rcv-msg>
              </ng-template>

              <ng-template #sndMsg>
                <app-snd-msg  [msg]= message></app-snd-msg>  
              </ng-template>  
            </ng-template>          
          </ng-container>

          <ng-template [ngIf]="showEmojiPicker">
            <emoji-mart class="emoji-mart" set="emojione" (emojiSelect)="addEmoji($event)" [skin]=1 [showPreview]="false"></emoji-mart>
          </ng-template>
          

          <ng-container *ngIf="showRecorder">
            <div class="record-div" >
              <div id="controls">
                <button class="material-icons md-18" id="record" *ngIf="!isRecording && !blobUrl" (click)="startRecording()">fiber_manual_record</button>
                <button class="material-icons" id="stop" *ngIf="isRecording && !blobUrl" (click)="stopRecording()">stop</button>
                <div *ngIf="isRecording && !blobUrl" id="time">{{recordedTime}}</div>
                <audio *ngIf="!isRecording && blobUrl" controls>
                  <source [src]="blobUrl" type="audio/webm">
                </audio>
                <p *ngIf="!isRecording && !blobUrl" id="time">Record</p>
                <div class="RecordAction">
                  <button class="material-icons pull-right" *ngIf="!isRecording && blobUrl" (click)="toSend()">done</button>
                  <button class="material-icons pull-right" *ngIf="!isRecording && blobUrl" (click)="clearRecordedData()">highlight_off</button>
                </div>
              </div>
            </div>
          </ng-container>
          
        </div>
        
        <div class="row reply">
          <div class="col-sm-1 col-xs-1 reply-emojis">
            <i class="fa fa-smile-o fa-2x" (click)='toggleEmojiPicker()'></i>
          </div>
          <div class="col-sm-9 col-xs-9 reply-main">
            <textarea class="form-control" rows="1" id="comment" [(ngModel)]="message"></textarea>
          </div>
          <div class="col-sm-1 col-xs-1 reply-recording">
            <i class="fa fa-microphone fa-2x" aria-hidden="true" (click)='toggleRec()'></i>
          </div>
          <div class="col-sm-1 col-xs-1 reply-send">
            <i class="fa fa-send fa-2x" aria-hidden="true" (click)="toSend()"></i>
          </div>
        </div>
        `,
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  public message="";
  public user = "";
  public rcvmsgs  =  [];
  showRecorder:boolean= false;
  showEmojiPicker = false;
  isRecording = false;
  recordedTime;
  blobData;
  blobUrl;

  constructor(private webservice : WebService,private audioRecordingService: AudioRecordingService,private sanitizer: DomSanitizer) { }

  checkUser(user){
    return Boolean(user!=this.user)
  }

  ngOnInit() {
    this.webservice.setupSocketConnection();
    this.webservice.onNewMessage().subscribe(msg => {
      this.rcvmsgs.push(msg);
    }); 
    this.webservice.getUser().subscribe(msg => {
      this.user = JSON.parse(JSON.parse(JSON.stringify(msg))._body).username;
    });
    this.webservice.onActive().subscribe(msg => {
      if(msg.name!=this.user){
        this.rcvmsgs.push(msg);
      }   
    });

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobData=data.blob;
      console.log(this.blobData);
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }

  toSend(){
    if(this.blobData){
      this.webservice.sendMessage({"name" :  this.user,  "msg":this.blobData});
      this.blobUrl=null;
      this.blobData=null;
      this.showRecorder=false;
    }
    if(this.message.length>0){
      this.webservice.sendMessage({"name" :  this.user,  "msg":this.message});
      this.message="";
    }
  }

  toggleRec() { 
    this.showRecorder= !this.showRecorder;
  }
  toggleEmojiPicker() {
    console.log('picker called!')
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  addEmoji(event) {
    this.message = this.message+event.emoji.native;
  }
  ClickedOut(event) {
    if(event.target.id === "conversation") {
      this.showEmojiPicker = false;
    } 
  }
  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
      console.log((this.blobUrl));
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
    this.blobData=null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

}
