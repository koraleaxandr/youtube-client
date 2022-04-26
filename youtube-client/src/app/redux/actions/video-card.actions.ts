/* eslint-disable max-classes-per-file */
import { Action } from '@ngrx/store';

import { VideoCard } from 'src/app/youtube/models/video-card.model';

export enum CardsActions {
  CreateCard = '[Card List] Add VideoCard',
  RemoveCard = '[Card List] Remove VideoCard',
  RemoveAllCards = '[Card List] Remove All VideoCard',
  GetCardsList = '[Card List] Get Stored VideoCards',
}

export class CreateCard implements Action {
  readonly type = CardsActions.CreateCard;

  constructor(public payload: { card: VideoCard }) {}
}

export class RemoveCard implements Action {
  readonly type = CardsActions.RemoveCard;

  constructor(public payload: { videoUrl: string }) {}
}

export class RemoveAllCards implements Action {
  readonly type = CardsActions.RemoveAllCards;
}

export class GetCardsList implements Action {
  readonly type = CardsActions.GetCardsList;

  constructor(public payload: { cards: VideoCard[] }) {}
}

export type CardsUnion =
  | CreateCard
  | RemoveCard
  | RemoveAllCards
  | GetCardsList;
