import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import {
  Item,
} from '../../models/search-item.model';
import {
  SearchSortService,
} from '../../services/search-sort.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  animations: [
    trigger('animationTriggerName', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1.2s', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        animate('1.2s', style({ opacity: 0 })),
      ]),
    ]),
  ],
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
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.selectedItem = this.searchSortService.getItemForId(this.id);
  }
}
