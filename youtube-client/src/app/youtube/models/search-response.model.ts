import {
  Item,
} from './search-item.model';

export interface SearchResponse {
  kind: string,
  etag: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: Item[]
}

export interface YoutubeSearchList {
  kind: string,
  etag: string,
  id: {
    kind: string,
    videoId: string,
    channelId: string,
    playlistId: string
  },
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
      key: {
        url: string,
        width: number,
        height: number
      }
    },
    channelTitle: string,
    liveBroadcastContent: string
  }
}
