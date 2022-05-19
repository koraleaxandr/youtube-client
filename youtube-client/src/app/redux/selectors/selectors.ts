import { createSelector } from '@ngrx/store';
import { SearchResponse } from '../../youtube/models/search-response.model';
import { AppState } from '../models/state.models';

export const searchState = (state: AppState) => state.search;

export const getSearch = createSelector(searchState, (state: SearchResponse[]) => {
  console.log(state);
  return state;
});
