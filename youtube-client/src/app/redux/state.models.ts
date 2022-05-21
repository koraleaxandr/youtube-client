import { VideoCard } from '../youtube/models/video-card.model';
import { SearchResponse } from '../youtube/models/search-response.model';

export interface AppState {
  videoCardsReducer:VideoCardsState,
  searchReducer: SearchState,
}

export interface VideoCardsState {
  cards: VideoCard[];
}

export interface SearchState {
  search:SearchResponse[];
}

export const initialCardsState: VideoCardsState = {
  cards: [],
};

export const initialSearchState: SearchState = {
  search: [],
};
