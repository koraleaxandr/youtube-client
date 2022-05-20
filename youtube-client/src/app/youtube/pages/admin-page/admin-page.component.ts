import {
  Component,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher } from '../../../auth/services/error-state.service';
import { VideoCard } from '../../models/video-card.model';
import { addCard } from '../../../redux/actions/video-card.actions';
import { MessageComponent } from '../../../shared/components/message/message.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})

export class AdminPageComponent {
  urlReg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private router: Router, private store: Store, public dialog: MatDialog) {}

  createNewCardForm: FormGroup = new FormGroup({
    titleFormControl: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    descriptionFormControl: new FormControl('', [Validators.maxLength(255)]),
    linkImgFormControl: new FormControl('', [Validators.required, Validators.pattern(this.urlReg)]),
    linkVideoFormControl: new FormControl('', [Validators.required, Validators.pattern(this.urlReg)]),
    dateFormControl: new FormControl('', [Validators.required, this.fromToDate()]),
  });

  matcher = new MyErrorStateMatcher();

  fromToDate(errorName: string = 'invalidDate'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromDate = new Date(control?.value);
      const today = new Date();
      if (fromDate && (fromDate !== null && today !== null) && fromDate > today) {
        return {
          [errorName]: true,
        };
      }
      return null;
    };
  }

  getNewVideoParams() {
    const videoCard: VideoCard = {
      title: this.createNewCardForm.controls['titleFormControl'].value,
      description: this.createNewCardForm.controls['descriptionFormControl'].value,
      imgUrl: this.createNewCardForm.controls['linkVideoFormControl'].value,
      videoUrl: this.createNewCardForm.controls['linkVideoFormControl'].value,
      createDate: this.createNewCardForm.controls['dateFormControl'].value,
    };
    this.store.dispatch(addCard({ card: videoCard }));
    this.dialog.open(MessageComponent, {
      width: '250px', height: '400px',
    });
    console.log('card created');
    console.log(JSON.stringify(videoCard));
  }
}
