import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBoxShadowColorizing]',
})
export class BoxShadowColorizingDirective implements OnInit {
  @Input() appBoxShadowColorizing = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.highlight(this.appBoxShadowColorizing);
  }

  private highlight(publishedAt: string) {
    this.el.nativeElement.style.boxShadow = `5px 10px 10px rgba(${this.getColorPublicationDate(
      publishedAt,
    )}, 0.25)`;
  }

  private getColorPublicationDate(publishedAt: string): string {
    let color = '0,128,0';
    const MILLISECONDS_IN_WEEK: number = 7 * 24 * 60 * 60 * 1000;
    const YELLOW_PUBLICATION_PERIOD_START_MONTH: number = 6;
    const YELLOW_PUBLICATION_PERIOD_END_MONTH: number = 1;
    const today = new Date();
    const publicationDate = new Date(publishedAt);
    const getDateYear = (date: Date): number => Number(date.getUTCFullYear());
    const getDateMonth = (date: Date): number =>
      Number(date.getUTCMonth() + 1) + getDateYear(date) * 12;
    const getDateDay = (date: Date): number => Number(date.getUTCDate());

    if (
      getDateMonth(today) - getDateMonth(publicationDate) >
      YELLOW_PUBLICATION_PERIOD_START_MONTH
    ) {
      color = '255,0,0';
      return color;
    }
    if (
      getDateMonth(today) - getDateMonth(publicationDate) ===
        YELLOW_PUBLICATION_PERIOD_START_MONTH &&
      getDateDay(today) < getDateDay(publicationDate)
    ) {
      color = '255,255,0';
      return color;
    }
    if (getDateMonth(today) - getDateMonth(publicationDate) > YELLOW_PUBLICATION_PERIOD_END_MONTH) {
      color = '255,255,0';
      return color;
    }
    if (
      getDateMonth(today) - getDateMonth(publicationDate) === YELLOW_PUBLICATION_PERIOD_END_MONTH &&
      getDateDay(today) > getDateDay(publicationDate)
    ) {
      color = '255,255,0';
      return color;
    }
    if (Number(today) - Number(publicationDate.getTime()) <= MILLISECONDS_IN_WEEK) {
      color = '0,0,255';
      return color;
    }
    return color;
  }
}
