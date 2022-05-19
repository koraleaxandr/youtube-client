import { VideoCard } from '../../youtube/models/video-card.model';
import { SearchResponse } from '../../youtube/models/search-response.model';

export interface AppState {
  cards: CardsState;
  search: SearchState;
}

export interface CardsState {
  cards: VideoCard[];
}

export const initialCardsState: CardsState = {
  cards: [],
};

export interface SearchState {
  search: SearchResponse[];
}

export const initialSearchState: SearchState = {
  search: [],
};
