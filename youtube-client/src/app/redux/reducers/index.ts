import {
  // ActionReducer,
  // ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
  MetaReducer,
} from '@ngrx/store';

import { State } from '../models/state.model';
import { environment } from '../../../environments/environment';

import { videoCardsReducer } from './video-card.reducer';
import { searchReducer } from './search.reducer';

export const reducers: ActionReducerMap<State> = {
  videoCardsReducer, searchReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const appState = {
  cards: videoCardsReducer,
  search: searchReducer,
};
