import { createReducer, on } from '@ngrx/store';

import { getCardsList } from './actions/video-card.actions';
import { VideoCard } from '../../youtube/models/video-card.model';

export const initialState: ReadonlyArray<VideoCard> = [];

export const videoCardsReducer = createReducer(
  initialState,
  on(getCardsList, (state, { cards }) => cards),
);
