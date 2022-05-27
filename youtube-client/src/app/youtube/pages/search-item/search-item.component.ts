import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, Observable } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';
import { Item } from '../../models/search-item.model';
import { SearchSortService } from '../../services/search-sort.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  animations: [
    trigger('animationTriggerName', [
      transition('void => *', [style({ opacity: 0 }), animate('1.2s', style({ opacity: 1 }))]),
      transition('* => void', [animate('1.2s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SearchItemComponent implements OnInit, OnDestroy {
  id?: string;

  unsubscribe$ = new Subject<void>();

  getDetailedItem$: Observable<Item | null> = this.searchSortService.getDetailedItem;

  selectedItem: Item | null = null;

  videoUrl: SafeResourceUrl = '';

  constructor(
    public searchSortService: SearchSortService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.searchSortService.getItemForId(this.id);
    this.updateVideoUrl(this.id);
    this.getDetailedItem$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item) => (this.selectedItem = item));
  }

  updateVideoUrl(id: string) {
    const dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}
