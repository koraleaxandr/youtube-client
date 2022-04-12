import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
// ParamMap,
} from '@angular/router';
// import { switchMap } from 'rxjs/operators';
import {
  Item,
} from '../../../models/search-item.model';
import {
  SearchSortService,
} from '../../../services/search-sort.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  id ? : string;

  selectedItem ? : Item;

  searchSortService: SearchSortService;

  constructor(
    searchSortService: SearchSortService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.searchSortService = searchSortService;
  }

  ngOnInit(): void {
    // this.id = (this.searchSortService.selectedItem as Item).id as string;
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.selectedItem = this.searchSortService.getItemForId(this.id);
  }
}
