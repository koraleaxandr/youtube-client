// import { ActionReducer } from '@ngrx/store';

// import { State } from '../models/store.models';
import { VideoCard } from 'src/app/youtube/models/video-card.model';
import { CardsActions, CardsUnion } from '../actions/video-card.actions';

export interface State {
  cards: ReadonlyArray<VideoCard>;
}

const initialState: State = {
  cards: [],
};

export function videoCardsReducer(action: CardsUnion, state: State = initialState): State {
  switch (action.type) {
    case CardsActions.CreateCard:
      return {
        ...state,
        cards: action.payload.card,
      };
    // case CardsActions.RemoveCard:
    //   return {
    //     ...state,
    //     cards: action.payload.videoUrl,
    //   };
    case CardsActions.GetCardsList:
      return {
        ...state,
      };
    case CardsActions.RemoveAllCards:
      return {
        ...state,
        cards: [],
      };
    default:
      return state;
  }
}
