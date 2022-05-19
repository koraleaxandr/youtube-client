import { VideoCard } from '../../youtube/models/video-card.model';
import { SearchResponse } from '../../youtube/models/search-response.model';

export interface AppState {
  cards: VideoCard[];
  search: SearchResponse[];
}

export const initialCardsState: VideoCard[] = [];

export const initialSearchState: SearchResponse[] = [];
