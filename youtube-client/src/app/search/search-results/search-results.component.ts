import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/search-item.model';
import { SearchResponse } from '../../models/search-response.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  selectedItem?: Item;
  dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  date = new Date().toLocaleDateString('en-en');
  date1 = new Date('2019-10-29T15:00:14.000Z').getTime();


  @Input() searchResponse?: SearchResponse | null;

  // constructor() { }

  ngOnInit(): void {
    console.log('Date now ' + this.date);
    console.log('Date  ' + this.date1);
  }

  public onSelect(item: Item): void {
    this.selectedItem = item;
  }

  public getColorPublicationDate (publicationAt: string): string {
    let color = 'blue';
    const dateNow = new Date();
    const millisecondsInWeek: number = 7*24*60*60*1000;
    const publicationDate = new Date(publicationAt).getTime();
    color = (dateNow - publicationDate) > millisecondsInWeek ? 'green' : 'blue';

    return color;
  }
}
