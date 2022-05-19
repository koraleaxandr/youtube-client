import {
  Action,
  ActionReducer,
} from '@ngrx/store';
import { videoCardsReducer } from './video-card.reducer';
import { searchReducer } from './search.reducer';
import { VideoCard } from '../../youtube/models/video-card.model';
import { SearchResponse } from '../../youtube/models/search-response.model';

export const reducers: {
  videoCardsReducer: ActionReducer<VideoCard[], Action>;
  searchReducer: ActionReducer<SearchResponse[], Action> } = {
  videoCardsReducer, searchReducer,
};
