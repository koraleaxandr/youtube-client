import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoCard } from '../../../youtube/models/video-card.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  messageForUser: string = 'New Card created';

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { card: VideoCard, title: string }) {}

  ngOnInit(): void {
    console.log(this.data);
    setTimeout(() => {
      this.dialog.closeAll();
    }, 3500);
  }
}
