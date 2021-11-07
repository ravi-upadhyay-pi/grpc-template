import { Component } from '@angular/core';
import { HelloRequest } from '../generated/helloworld_pb';
import { GreeterClient } from '../generated/HelloworldServiceClientPb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  greeterClient: GreeterClient;
  message = '';

  constructor() {
    this.greeterClient = new GreeterClient("");
    const request = new HelloRequest();
    request.setName("Ravi");
    this.greeterClient.sayHello(request, null).then(reply => {
      this.message = reply.getMessage();
    });
  }
}
