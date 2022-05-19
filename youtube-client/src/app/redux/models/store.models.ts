import { SearchResponse } from 'src/app/youtube/models/search-response.model';
import { VideoCard } from 'src/app/youtube/models/video-card.model';

export interface State {
  cards: ReadonlyArray<VideoCard>;
  search: ReadonlyArray<SearchResponse>;
}
