import {
  // ActionReducer,
  // ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { videoCardsReducer } from './video-card.reducer';

export interface State {
  cards: ReadonlyArray<VideoCard>;
  search: ReadonlyArray<SearchResponse>;
}

export const reducers: ActionReducerMap<State> = {
  videoCardsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
