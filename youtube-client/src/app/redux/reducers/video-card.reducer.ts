import { createReducer, on } from '@ngrx/store';

import { initialCardsState } from '../models/state.models';
import * as CardsActions from '../actions/video-card.actions';

export const videoCardsReducer = createReducer(
  initialCardsState,
  on(CardsActions.getCardsList, (state) => ({ ...state })),
  on(CardsActions.addCard, (state, { card }) => ({ ...state, cards: [...state, card] })),
  on(CardsActions.removeAllCards, (state) => ({ ...state, cards: [] })),
  on(CardsActions.removeCard, (state, { videoUrl }) => ({
    ...state,
    cards: [...state.filter((card) => card.videoUrl !== videoUrl)],
  })),
  on(CardsActions.getCardByUrl, (state, { videoUrl }) => ({
    ...state,
    cards: [...state.filter((card) => card.videoUrl === videoUrl)],
  })),
);
