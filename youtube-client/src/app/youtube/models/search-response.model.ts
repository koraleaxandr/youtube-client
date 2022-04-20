import {
  Item,
  SearchedItem,
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
  nextPageToken: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: SearchedItem[]
}

// {
//   "kind": "youtube#searchListResponse",
//   "etag": "PhQ6WG1RdOVU0DeUC_DGa1OWscc",
//   "nextPageToken": "CAUQAA",
//   "regionCode": "BY",
//   "pageInfo": {
//       "totalResults": 242907,
//       "resultsPerPage": 5
//   },
//   "items": [
//       {
//           "kind": "youtube#searchResult",
//           "etag": "XCnMOzWhuNKu0mjJZEhsU7yDT1k",
//           "id": {
//               "kind": "youtube#video",
//               "videoId": "6-2XChOWqHE"
//           },
//           "snippet": {
//               "publishedAt": "2019-11-12T16:59:51Z",
//               "channelId": "UCpYF_3dMxbTukeCG2GsgPbA",
//               "title": "Dance Moms: The OG Moms LEAVE ALDC FOR GOOD (Season 7 Flashback) | Lifetime",
//               "description": "Can't wait to catch up on your favorite Lifetime shows and movies? Stay up to date on upcoming premieres at ...",
//               "thumbnails": {
//                   "default": {
//                       "url": "https://i.ytimg.com/vi/6-2XChOWqHE/default.jpg",
//                       "width": 120,
//                       "height": 90
//                   },
//                   "medium": {
//                       "url": "https://i.ytimg.com/vi/6-2XChOWqHE/mqdefault.jpg",
//                       "width": 320,
//                       "height": 180
//                   },
//                   "high": {
//                       "url": "https://i.ytimg.com/vi/6-2XChOWqHE/hqdefault.jpg",
//                       "width": 480,
//                       "height": 360
//                   }
//               },
//               "channelTitle": "Lifetime",
//               "liveBroadcastContent": "none",
//               "publishTime": "2019-11-12T16:59:51Z"
//           }
//       },
//       {
//           "kind": "youtube#searchResult",
//           "etag": "2iAlrDomoYPCYCJJS1CaaGgULdQ",
//           "id": {
//               "kind": "youtube#video",
//               "videoId": "_hNxfiXmeAE"
//           },
//           "snippet": {
//               "publishedAt": "2016-01-04T07:22:17Z",
//               "channelId": "UC_F8DoJf9MZogEOU51TpTbQ",
//               "title": "Clash Royale: Gameplay First Look",
//               "description": "Welcome to the first ever look at Supercell's newest game, Clash Royale. Learn the basics and watch Chief Pat take on Chih from ...",
//               "thumbnails": {
//                   "default": {
//                       "url": "https://i.ytimg.com/vi/_hNxfiXmeAE/default.jpg",
//                       "width": 120,
//                       "height": 90
//                   },
//                   "medium": {
//                       "url": "https://i.ytimg.com/vi/_hNxfiXmeAE/mqdefault.jpg",
//                       "width": 320,
//                       "height": 180
//                   },
//                   "high": {
//                       "url": "https://i.ytimg.com/vi/_hNxfiXmeAE/hqdefault.jpg",
//                       "width": 480,
//                       "height": 360
//                   }
//               },
//               "channelTitle": "Clash Royale",
//               "liveBroadcastContent": "none",
//               "publishTime": "2016-01-04T07:22:17Z"
//           }
//       },
//       {
//           "kind": "youtube#searchResult",
//           "etag": "Inw2NT5VF-XEbniaRhX4rXG4T28",
//           "id": {
//               "kind": "youtube#video",
//               "videoId": "w8Mho8b7dpA"
//           },
//           "snippet": {
//               "publishedAt": "2019-08-21T11:56:34Z",
//               "channelId": "UCTQKT5QqO3h7y32G8VzuySQ",
//               "title": "An OG Vacation - The International 2019",
//               "description": "No team accomplished more in 2018 than OG. A few months after hoisting the Aegis in Vancouver, the defending champions ...",
//               "thumbnails": {
//                   "default": {
//                       "url": "https://i.ytimg.com/vi/w8Mho8b7dpA/default.jpg",
//                       "width": 120,
//                       "height": 90
//                   },
//                   "medium": {
//                       "url": "https://i.ytimg.com/vi/w8Mho8b7dpA/mqdefault.jpg",
//                       "width": 320,
//                       "height": 180
//                   },
//                   "high": {
//                       "url": "https://i.ytimg.com/vi/w8Mho8b7dpA/hqdefault.jpg",
//                       "width": 480,
//                       "height": 360
//                   }
//               },
//               "channelTitle": "dota2",
//               "liveBroadcastContent": "none",
//               "publishTime": "2019-08-21T11:56:34Z"
//           }
//       },
//       {
//           "kind": "youtube#searchResult",
//           "etag": "c5BZIqb5H7ZiYBn4vNk2fC6bXZw",
//           "id": {
//               "kind": "youtube#video",
//               "videoId": "jIo8Hu9b_Pk"
//           },
//           "snippet": {
//               "publishedAt": "2020-02-07T16:00:27Z",
//               "channelId": "UCaqULAbiq-6ZRlKmx0Uv_Cw",
//               "title": "LIVING IN SNOW FOR 24 HOURS | Rimorav Vlogs",
//               "description": "Watch LIVING IN SNOW FOR 24 HOURS.",
//               "thumbnails": {
//                   "default": {
//                       "url": "https://i.ytimg.com/vi/jIo8Hu9b_Pk/default.jpg",
//                       "width": 120,
//                       "height": 90
//                   },
//                   "medium": {
//                       "url": "https://i.ytimg.com/vi/jIo8Hu9b_Pk/mqdefault.jpg",
//                       "width": 320,
//                       "height": 180
//                   },
//                   "high": {
//                       "url": "https://i.ytimg.com/vi/jIo8Hu9b_Pk/hqdefault.jpg",
//                       "width": 480,
//                       "height": 360
//                   }
//               },
//               "channelTitle": "Rimorav Vlogs",
//               "liveBroadcastContent": "none",
//               "publishTime": "2020-02-07T16:00:27Z"
//           }
//       },
//       {
//           "kind": "youtube#searchResult",
//           "etag": "F0Ikf_HsIf27se2nw-i8fWzNAuA",
//           "id": {
//               "kind": "youtube#video",
//               "videoId": "XCFEBi3m7Lo"
//           },
//           "snippet": {
//               "publishedAt": "2021-05-28T14:00:00Z",
//               "channelId": "UCAJnyTWJPpKXuwgWQDdNWrQ",
//               "title": "Welcome to Pawston / Ruff Day on the Job 🐾 Go, Dog. Go! FULL EPISODE | Netflix Jr",
//               "description": "Tag and her new friend, Scooch, make their way across town to attend a party in a tree. Mail dog Gerald is being chased and can't ...",
//               "thumbnails": {
//                   "default": {
//                       "url": "https://i.ytimg.com/vi/XCFEBi3m7Lo/default.jpg",
//                       "width": 120,
//                       "height": 90
//                   },
//                   "medium": {
//                       "url": "https://i.ytimg.com/vi/XCFEBi3m7Lo/mqdefault.jpg",
//                       "width": 320,
//                       "height": 180
//                   },
//                   "high": {
//                       "url": "https://i.ytimg.com/vi/XCFEBi3m7Lo/hqdefault.jpg",
//                       "width": 480,
//                       "height": 360
//                   }
//               },
//               "channelTitle": "Netflix Jr.",
//               "liveBroadcastContent": "none",
//               "publishTime": "2021-05-28T14:00:00Z"
//           }
//       }
//   ]
// }
