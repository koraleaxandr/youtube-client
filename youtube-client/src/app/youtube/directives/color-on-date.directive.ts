import {
  Directive, OnInit, ElementRef, Input,
} from '@angular/core';

@Directive({
  selector: '[appColorOnDate]',
})
export class ColorOnDateDirective implements OnInit {
  @Input() appColorOnDate = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.highlight(this.appColorOnDate);
  }

  private highlight(publishedAt: string) {
    this.el.nativeElement.style.backgroundColor = this.getColorPublicationDate(publishedAt);
  }

  private getColorPublicationDate(publishedAt: string): string {
    let color = 'green';
    const MILLISECONDS_IN_WEEK: number = 7 * 24 * 60 * 60 * 1000;
    const YELLOW_PUBLICATION_PERIOD_START_MONTH: number = 6;
    const YELLOW_PUBLICATION_PERIOD_END_MONTH: number = 1;
    const today = new Date();
    const publicationDate = new Date(publishedAt);
    const getDateYear = (date: Date): number => Number(date.getUTCFullYear());
    const getDateMonth = (date: Date): number => (Number(date.getUTCMonth() + 1) + getDateYear(date) * 12);
    const getDateDay = (date: Date): number => Number(date.getUTCDate());

    if ((getDateMonth(today) - getDateMonth(publicationDate)) > YELLOW_PUBLICATION_PERIOD_START_MONTH) {
      color = 'red';
      return color;
    }
    if (((getDateMonth(today) - getDateMonth(publicationDate)) === YELLOW_PUBLICATION_PERIOD_START_MONTH) && (getDateDay(today) < getDateDay(publicationDate))) {
      color = 'yellow';
      return color;
    }
    if (getDateMonth(today) - getDateMonth(publicationDate) > YELLOW_PUBLICATION_PERIOD_END_MONTH) {
      color = 'yellow';
      return color;
    }
    if ((getDateMonth(today) - getDateMonth(publicationDate) === YELLOW_PUBLICATION_PERIOD_END_MONTH) && (getDateDay(today) > getDateDay(publicationDate))) {
      color = 'yellow';
      return color;
    }
    if ((Number(today) - Number(publicationDate.getTime())) <= MILLISECONDS_IN_WEEK) {
      color = 'blue';
      return color;
    }
    return color;
  }
}
