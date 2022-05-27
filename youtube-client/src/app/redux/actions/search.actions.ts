import { createAction, props } from '@ngrx/store';
import { SearchResponse } from '../../youtube/models/search-response.model';

enum SearchActions {
  GetStoredSearch = '[Search List] Get Stored Search',
  DeleteStoredSearch = '[Search List] Remove Stored Search',
  AddStoredSearch = '[Search List] Add Stored Search',
}

export const getStoredSearch = createAction(SearchActions.GetStoredSearch);

export const deleteStoredSearch = createAction(SearchActions.DeleteStoredSearch);
export const addStoredSearch = createAction(SearchActions.AddStoredSearch, props<SearchResponse>());
