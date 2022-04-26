import {
  Action,
  ActionReducerMap,
  // ActionReducer,
  // ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
  MetaReducer,
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
// import { State } from '../models/store.models';
import * as Cards from './video-card.reducer';
import { videoCardsReducer } from './video-card.reducer';

export interface State {
  cards: Cards.State;
// search: Search.State;
}

export const reducers: ActionReducerMap<State, Action> = {
  videoCardsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
