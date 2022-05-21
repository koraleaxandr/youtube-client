import { createSelector } from '@ngrx/store';
import { SearchResponse } from '../../youtube/models/search-response.model';
import { AppState } from '../state.models';

export const searchState = (state: AppState) => state.searchReducer.search;

export const getSearch = createSelector(searchState, (state: SearchResponse) => state);
