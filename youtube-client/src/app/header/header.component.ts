import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SortSettings} from '../models/sort-settings.model';
import { SearchResponse } from '../models/search-response.model';
import { Item } from '../models/search-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sortSettings: SortSettings = {
  sortByParameter : 'snippet.publishedAt',
  sortByIncreaseParameter: 'increase',
  sortString : ''
  }
  searchResponse: SearchResponse | null = null;
  sortedSearchResult: SearchResponse | undefined = undefined;
  toggleSettings: string = 'off';

  @Output() changeSortedSearchResult = new EventEmitter();
  // constructor() { }

  ngOnInit(): void {
    console.log('header.component');
  }

  toggleDropSettings(toggle: string): void {
    this.toggleSettings = toggle;
  }

   getSearchResponse(data: SearchResponse):void {
    this.searchResponse = data;
    if(this.searchResponse) {
       this.sortSearchResponse(this.searchResponse)
      this.changeSortedSearchResult.emit();
    }
  }

   changeSortSettings(cangedSortSettings: SortSettings): void {
    this.sortSettings = cangedSortSettings;
    if(this.searchResponse) {
      this.sortSearchResponse(this.searchResponse)
      this.changeSortedSearchResult.emit();
console.log('changes header')
    }
  }

   sortSearchResponse(inputSearchResponse: SearchResponse): void {
    this.sortedSearchResult =  JSON.parse(JSON.stringify(inputSearchResponse));
    if (this.sortedSearchResult) {
    if (this.sortSettings.sortByParameter !== 'string') {
    const parameter = this.sortSettings.sortByParameter as keyof Item;
    if (this.sortSettings.sortByIncreaseParameter === 'increase') {
    this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
      let sort: number = 0;
     sort = (Number(new Date(a.snippet.publishedAt)) - Number(new Date(b.snippet.publishedAt))) >0 ? 1: -1;
     console.log(sort)
     return sort;
    });
    //console.log(JSON.stringify(this.sortedSearchResult.items))
  } else {
    this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
      let sort: number = 0;
      sort = (Number(b[parameter]) - Number(a[parameter]))? 1: -1;
      return sort;
    });
    //console.log(JSON.stringify(this.sortedSearchResult.items))
  }
  } else {
    const sortString: string = this.sortSettings.sortString.toLowerCase();
    this.sortedSearchResult.items = this.sortedSearchResult.items.filter((element) => {
      JSON.stringify(element.snippet).toString().toLowerCase().includes(sortString);
     // console.log(JSON.stringify(element.snippet).toString().toLowerCase())
    });
    console.log(JSON.stringify(this.sortedSearchResult.items))
  }
  }
}

}
