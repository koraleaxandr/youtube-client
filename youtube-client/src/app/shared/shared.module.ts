import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [AngularMaterialModule, MessageComponent],
})
export class SharedModule {}
