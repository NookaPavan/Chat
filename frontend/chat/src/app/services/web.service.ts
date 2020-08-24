import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject,Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:8080/';
    SOCKET_ENDPOINT= 'http://localhost:8080';
    socket;
    user;
    private memSubject = new Subject();
    members = this.memSubject.asObservable();


    setupSocketConnection() {
      console.log("Socket Connection is called!!");
      this.socket =  io(this.SOCKET_ENDPOINT);
      console.log("Socket Connection is running!!");
      this.getUser().subscribe(msg => {
        this.user = JSON.parse(JSON.parse(JSON.stringify(msg))._body).username;
        this.socket.emit('username',this.user);
        console.log("notified :"+ this.user);
      });
    }

    sendMessage(msg) {
      console.log('sendMessage called!!')
      this.socket.emit('chat_message', msg);
      console.log('Message send!!')
    }

    onNewMessage() {
        return Observable.create(observer => {
          this.socket.on('chat_message', msg => {
            observer.next(msg);
          });
        });
    }
    


    onActive() {
        return Observable.create(observer => {
          this.socket.on('is_online', msg => {
            observer.next(msg);
            this.memSubject.next(msg.actives);
            console.log(msg.actives);
            console.log('New Member arrived!!')
          });
        });
    }

    getUser() {
      return this.http.get('http://localhost:8080/users/me',{ withCredentials: true })
    }
    constructor(private http: Http) {
        //this.getMessages(this.getUser());
    }

    getMessages(user) {
    }

    private handleError(error) {
        console.error(error);
        //this.sb.open(error, 'close', { duration: 2000 });
    }
}