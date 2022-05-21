import { createReducer, on } from '@ngrx/store';

import { initialCardsState } from '../state.models';
import * as CardsActions from '../actions/video-card.actions';

export const videoCardsReducer = createReducer(
  initialCardsState,
  on(CardsActions.getCardsList, (state) => ({ ...state })),

  on(CardsActions.addCard, (state, { card }) => ({ ...state, cards: [...state.cards, card] })),
);
