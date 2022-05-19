import { createAction, props } from '@ngrx/store';
import { VideoCard } from '../../youtube/models/video-card.model';

enum CardsActions {
  CreateCard = '[Card List] Add VideoCard',
  RemoveCard = '[Card List] Remove VideoCard',
  RemoveAllCards = '[Card List] Remove All VideoCard',
  GetCardsList = '[Card List] Get Stored VideoCards',
  GetCardByUrl = '[Card List] Get VideoCard',
}

export const addCard = createAction(
  CardsActions.CreateCard,
  props<{ card: VideoCard }>(),
);

export const removeCard = createAction(
  CardsActions.RemoveCard,
  props<{ videoUrl: string }>(),
);

export const removeAllCards = createAction(
  CardsActions.RemoveAllCards,
);

export const getCardsList = createAction(
  CardsActions.GetCardsList,
);

export const getCardByUrl = createAction(
  CardsActions.RemoveCard,
  props<{ videoUrl: string }>(),
);
