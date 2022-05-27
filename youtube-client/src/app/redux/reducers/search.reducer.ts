import { createReducer, on } from '@ngrx/store';
import { initialSearchState } from '../state.models';
import * as SearchActions from '../actions/search.actions';

export const searchReducer = createReducer(
  initialSearchState,
  on(SearchActions.getStoredSearch, (state) => ({ ...state })),
  on(SearchActions.deleteStoredSearch, (state) => ({ ...state, search: [] })),
  on(SearchActions.addStoredSearch, (state, search) => ({
    ...state,
    search: [...state.search, search],
  })),
);
