import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  messageForUser: string = 'hello';
  // constructor() { }

  ngOnInit(): void {
    console.log('11');
  }
}
