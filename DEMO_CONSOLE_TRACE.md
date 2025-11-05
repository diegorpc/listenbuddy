from 8:12:44 to 8:14:40
```
User.createUser { username: 'user', password: 'password' } => { user: '019a5192-a72d-7a43-94d0-3390d1e3935b' }
[Requesting] Received request for path: /User/endSession
Requesting.request {
  user: '019a5192-a72d-7a43-94d0-3390d1e3935b',
  path: '/User/endSession'
} => { request: '019a5192-c2f5-7b09-9113-1a7afbbae3cd' }
User.endSession { user: '019a5192-a72d-7a43-94d0-3390d1e3935b' } => {}
Requesting.respond { request: '019a5192-c2f5-7b09-9113-1a7afbbae3cd' } => { request: '019a5192-c2f5-7b09-9113-1a7afbbae3cd' }
[Requesting] Received request for path: /User/startSession
Requesting.request { username: 'admin', password: 'password', path: '/User/startSession' } => { request: '019a5192-df29-72ef-b063-c050dda30a47' }
User.startSession { username: 'admin', password: 'password' } => {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  username: 'admin',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  listenBrainzName: 'yahello'
}
Requesting.respond {
  request: '019a5192-df29-72ef-b063-c050dda30a47',
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  username: 'admin',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  listenBrainzName: 'yahello'
} => { request: '019a5192-df29-72ef-b063-c050dda30a47' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopRecordings
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0,
  path: '/ListenBrainzAPI/getTopRecordings'
} => { request: '019a5192-e394-7539-add1-6de6974f946c' }
ListenBrainzAPI.getDailyActivity {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week'
} => {
  dailyActivity: {
    Friday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Monday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Saturday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Sunday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Thursday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Tuesday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Wednesday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ]
  },
  from_ts: 1761523200,
  to_ts: 1762128000,
  last_updated: 1762223473,
  stats_range: undefined,
  user_id: 'yahello'
}
ListenBrainzAPI.getDailyActivity {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week'
} => {
  dailyActivity: {
    Friday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Monday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Saturday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Sunday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Thursday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Tuesday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Wednesday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ]
  },
  from_ts: 1761523200,
  to_ts: 1762128000,
  last_updated: 1762223473,
  stats_range: undefined,
  user_id: 'yahello'
}
ListenBrainzAPI.getTopRecordings {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0
} => {
  recordings: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 22,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Salto Mortal'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 19,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Siente El Fuego'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 15,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Culpable'
    },
    {
      artist_mbids: [Array],
      artist_name: '鈴木光人',
      artists: [Array],
      caa_id: 38512076168,
      caa_release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      listen_count: 10,
      recording_mbid: '2c1712d3-3cfe-43d0-bd65-b2aafa7fddf3',
      release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      release_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack ～Special edit version～',
      track_name: 'クレイジーモーターサイクル -夜をぶっとばせ-'
    },
    {
      artist_mbids: [Array],
      artist_name: '小塚良太',
      artists: [Array],
      caa_id: 32169341510,
      caa_release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      listen_count: 10,
      recording_mbid: 'c276aa83-837b-46df-a97f-f6aa1d022036',
      release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      release_name: '真・女神転生V オリジナル・サウンドトラック',
      track_name: 'Battle -eon-'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 9,
      recording_mbid: 'ba36cc9e-7077-4a2a-a63c-e87ea08b0ef0',
      release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      release_name: 'Fuego',
      track_name: 'Déjalos que hablen'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17719961627,
      caa_release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      listen_count: 8,
      recording_mbid: 'f91844c8-336c-440c-811c-aece6851156b',
      release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      release_name: 'Consejo',
      track_name: 'Comedia de amor'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 8,
      recording_mbid: '5401becb-ab7b-4632-81ef-0ec0824f5002',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: 'Antidote'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 7,
      recording_mbid: 'e7ed8f90-3f9f-45b8-ab0f-771efedcee44',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: '橋上の戦い'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 7,
      recording_mbid: 'b9ecdd3a-728f-49c7-93fa-7c7a9590e4d9',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Village'
    }
  ]
}
Requesting.respond {
  request: '019a5192-e394-7539-add1-6de6974f946c',
  recordings: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 22,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Salto Mortal'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 19,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Siente El Fuego'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 15,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Culpable'
    },
    {
      artist_mbids: [Array],
      artist_name: '鈴木光人',
      artists: [Array],
      caa_id: 38512076168,
      caa_release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      listen_count: 10,
      recording_mbid: '2c1712d3-3cfe-43d0-bd65-b2aafa7fddf3',
      release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      release_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack ～Special edit version～',
      track_name: 'クレイジーモーターサイクル -夜をぶっとばせ-'
    },
    {
      artist_mbids: [Array],
      artist_name: '小塚良太',
      artists: [Array],
      caa_id: 32169341510,
      caa_release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      listen_count: 10,
      recording_mbid: 'c276aa83-837b-46df-a97f-f6aa1d022036',
      release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      release_name: '真・女神転生V オリジナル・サウンドトラック',
      track_name: 'Battle -eon-'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 9,
      recording_mbid: 'ba36cc9e-7077-4a2a-a63c-e87ea08b0ef0',
      release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      release_name: 'Fuego',
      track_name: 'Déjalos que hablen'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17719961627,
      caa_release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      listen_count: 8,
      recording_mbid: 'f91844c8-336c-440c-811c-aece6851156b',
      release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      release_name: 'Consejo',
      track_name: 'Comedia de amor'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 8,
      recording_mbid: '5401becb-ab7b-4632-81ef-0ec0824f5002',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: 'Antidote'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 7,
      recording_mbid: 'e7ed8f90-3f9f-45b8-ab0f-771efedcee44',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: '橋上の戦い'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 7,
      recording_mbid: 'b9ecdd3a-728f-49c7-93fa-7c7a9590e4d9',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Village'
    }
  ]
} => { request: '019a5192-e394-7539-add1-6de6974f946c' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopRecordings
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 10,
  path: '/ListenBrainzAPI/getTopRecordings'
} => { request: '019a5193-26ca-7e43-82d1-a605740be0c8' }
ListenBrainzAPI.getTopRecordings {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 10
} => {
  recordings: [
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 26777865177,
      caa_release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      listen_count: 6,
      recording_mbid: '70e0cc27-dae7-4352-9b49-931d4d1634e9',
      release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      release_name: 'そよ風アパートメント201',
      track_name: '部屋の窓辺'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 8837373509,
      caa_release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      listen_count: 6,
      recording_mbid: '9065484e-3334-4929-acd8-771336d3a229',
      release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      release_name: 'ゆめ',
      track_name: 'さち子'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 6,
      recording_mbid: 'b5f2162c-1876-4fd4-9ebf-277d86fcdd27',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Town'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 6,
      recording_mbid: '68fe13fd-86eb-4c01-9222-489c6c34bf84',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Small Shrine'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 8837373509,
      caa_release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      listen_count: 6,
      recording_mbid: 'd1fa99ed-64ad-4286-8cc7-a2d1f5fae12f',
      release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      release_name: 'ゆめ',
      track_name: 'A都市の秋'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 26777865177,
      caa_release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      listen_count: 5,
      recording_mbid: '54b53bd3-cf2f-4ee3-ba2d-39eb5bcfc08e',
      release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      release_name: 'そよ風アパートメント201',
      track_name: '雨足はやく'
    },
    {
      artist_mbids: [Array],
      artist_name: 'snowpoint lounge',
      artists: [Array],
      caa_id: 38628849632,
      caa_release_mbid: '3cc2b1fd-9198-4998-8026-164eddae0995',
      listen_count: 5,
      recording_mbid: 'd4c6c158-92a7-4e75-8395-64361a631655',
      release_mbid: '3cc2b1fd-9198-4998-8026-164eddae0995',
      release_name: 'FRONTIER ワンダーランド',
      track_name: 'Welcome to the Island!'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17719961627,
      caa_release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      listen_count: 5,
      recording_mbid: 'dc399a4a-ef83-45f7-bb3a-0d2f65b9d5e5',
      release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      release_name: 'Consejo',
      track_name: 'La vida nos acerca'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 13714648023,
      caa_release_mbid: '2033c3a3-7a64-4065-b08e-ea5f6421794a',
      listen_count: 4,
      recording_mbid: '5ee5fb80-220a-4cf2-b2ed-cc54070496ee',
      release_mbid: '2033c3a3-7a64-4065-b08e-ea5f6421794a',
      release_name: '木洩陽通りにて',
      track_name: '夜風'
    },
    {
      artist_mbids: [Array],
      artist_name: '松枝賀子 & 江口貴勅',
      artists: [Array],
      caa_id: 38360611545,
      caa_release_mbid: 'f85ba300-89e8-4351-8bf4-bfe67b23e329',
      listen_count: 4,
      recording_mbid: '1ff28717-f74e-45ba-ae4d-a527320210c2',
      release_mbid: 'f85ba300-89e8-4351-8bf4-bfe67b23e329',
      release_name: 'ファイナルファンタジーX-2 オリジナル・サウンドトラック',
      track_name: 'ビサイド'
    }
  ]
}
Requesting.respond {
  request: '019a5193-26ca-7e43-82d1-a605740be0c8',
  recordings: [
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 26777865177,
      caa_release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      listen_count: 6,
      recording_mbid: '70e0cc27-dae7-4352-9b49-931d4d1634e9',
      release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      release_name: 'そよ風アパートメント201',
      track_name: '部屋の窓辺'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 8837373509,
      caa_release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      listen_count: 6,
      recording_mbid: '9065484e-3334-4929-acd8-771336d3a229',
      release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      release_name: 'ゆめ',
      track_name: 'さち子'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 6,
      recording_mbid: 'b5f2162c-1876-4fd4-9ebf-277d86fcdd27',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Town'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 6,
      recording_mbid: '68fe13fd-86eb-4c01-9222-489c6c34bf84',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Small Shrine'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 8837373509,
      caa_release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      listen_count: 6,
      recording_mbid: 'd1fa99ed-64ad-4286-8cc7-a2d1f5fae12f',
      release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      release_name: 'ゆめ',
      track_name: 'A都市の秋'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 26777865177,
      caa_release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      listen_count: 5,
      recording_mbid: '54b53bd3-cf2f-4ee3-ba2d-39eb5bcfc08e',
      release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      release_name: 'そよ風アパートメント201',
      track_name: '雨足はやく'
    },
    {
      artist_mbids: [Array],
      artist_name: 'snowpoint lounge',
      artists: [Array],
      caa_id: 38628849632,
      caa_release_mbid: '3cc2b1fd-9198-4998-8026-164eddae0995',
      listen_count: 5,
      recording_mbid: 'd4c6c158-92a7-4e75-8395-64361a631655',
      release_mbid: '3cc2b1fd-9198-4998-8026-164eddae0995',
      release_name: 'FRONTIER ワンダーランド',
      track_name: 'Welcome to the Island!'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17719961627,
      caa_release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      listen_count: 5,
      recording_mbid: 'dc399a4a-ef83-45f7-bb3a-0d2f65b9d5e5',
      release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      release_name: 'Consejo',
      track_name: 'La vida nos acerca'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 13714648023,
      caa_release_mbid: '2033c3a3-7a64-4065-b08e-ea5f6421794a',
      listen_count: 4,
      recording_mbid: '5ee5fb80-220a-4cf2-b2ed-cc54070496ee',
      release_mbid: '2033c3a3-7a64-4065-b08e-ea5f6421794a',
      release_name: '木洩陽通りにて',
      track_name: '夜風'
    },
    {
      artist_mbids: [Array],
      artist_name: '松枝賀子 & 江口貴勅',
      artists: [Array],
      caa_id: 38360611545,
      caa_release_mbid: 'f85ba300-89e8-4351-8bf4-bfe67b23e329',
      listen_count: 4,
      recording_mbid: '1ff28717-f74e-45ba-ae4d-a527320210c2',
      release_mbid: 'f85ba300-89e8-4351-8bf4-bfe67b23e329',
      release_name: 'ファイナルファンタジーX-2 オリジナル・サウンドトラック',
      track_name: 'ビサイド'
    }
  ]
} => { request: '019a5193-26ca-7e43-82d1-a605740be0c8' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopArtists
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0,
  path: '/ListenBrainzAPI/getTopArtists'
} => { request: '019a5193-3c37-7b8f-b53b-7be1e21fb52d' }
ListenBrainzAPI.getTopArtists {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0
} => {
  artists: [
    {
      artist_mbid: '3a14e204-f801-4811-adf1-b8ce263f01f5',
      artist_name: 'La Secta AllStar',
      listen_count: 96
    },
    {
      artist_mbid: null,
      artist_name: 'La Secta AllStar',
      listen_count: 66
    },
    {
      artist_mbid: '8bff8d1d-2e87-4b97-9909-2bd3404e92b9',
      artist_name: 'Lamp',
      listen_count: 44
    },
    {
      artist_mbid: '53a2cda4-31d0-405e-8a9d-5027c2479ebb',
      artist_name: '崎元仁',
      listen_count: 36
    },
    {
      artist_mbid: 'd3ec6ede-fff4-4299-a6e9-3df7161f380d',
      artist_name: 'snowpoint lounge',
      listen_count: 32
    },
    {
      artist_mbid: 'eada10cf-eba9-4a8c-afc5-cc8999ee15a2',
      artist_name: 'すぎやまこういち',
      listen_count: 21
    },
    {
      artist_mbid: '0a0e9b09-3eec-4c66-9153-a2964d888ee6',
      artist_name: '鈴木光人',
      listen_count: 15
    },
    {
      artist_mbid: 'e68f4909-eff1-4d9e-8178-bd612d235d68',
      artist_name: '金﨑猛',
      listen_count: 10
    },
    {
      artist_mbid: 'a0b5f196-b505-4de0-8a85-1b0a0951496d',
      artist_name: '小塚良太',
      listen_count: 10
    },
    {
      artist_mbid: 'e8483bbc-0c9b-4322-bd1e-ada3ec3d9c18',
      artist_name: 'bliss3three',
      listen_count: 10
    }
  ]
}
Requesting.respond {
  request: '019a5193-3c37-7b8f-b53b-7be1e21fb52d',
  artists: [
    {
      artist_mbid: '3a14e204-f801-4811-adf1-b8ce263f01f5',
      artist_name: 'La Secta AllStar',
      listen_count: 96
    },
    {
      artist_mbid: null,
      artist_name: 'La Secta AllStar',
      listen_count: 66
    },
    {
      artist_mbid: '8bff8d1d-2e87-4b97-9909-2bd3404e92b9',
      artist_name: 'Lamp',
      listen_count: 44
    },
    {
      artist_mbid: '53a2cda4-31d0-405e-8a9d-5027c2479ebb',
      artist_name: '崎元仁',
      listen_count: 36
    },
    {
      artist_mbid: 'd3ec6ede-fff4-4299-a6e9-3df7161f380d',
      artist_name: 'snowpoint lounge',
      listen_count: 32
    },
    {
      artist_mbid: 'eada10cf-eba9-4a8c-afc5-cc8999ee15a2',
      artist_name: 'すぎやまこういち',
      listen_count: 21
    },
    {
      artist_mbid: '0a0e9b09-3eec-4c66-9153-a2964d888ee6',
      artist_name: '鈴木光人',
      listen_count: 15
    },
    {
      artist_mbid: 'e68f4909-eff1-4d9e-8178-bd612d235d68',
      artist_name: '金﨑猛',
      listen_count: 10
    },
    {
      artist_mbid: 'a0b5f196-b505-4de0-8a85-1b0a0951496d',
      artist_name: '小塚良太',
      listen_count: 10
    },
    {
      artist_mbid: 'e8483bbc-0c9b-4322-bd1e-ada3ec3d9c18',
      artist_name: 'bliss3three',
      listen_count: 10
    }
  ]
} => { request: '019a5193-3c37-7b8f-b53b-7be1e21fb52d' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopArtists
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 10,
  path: '/ListenBrainzAPI/getTopArtists'
} => { request: '019a5193-6013-7141-a309-0c8701772b38' }
ListenBrainzAPI.getTopArtists {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 10
} => {
  artists: [
    {
      artist_mbid: 'd1ab501b-0674-40b4-97b3-ea416fb634db',
      artist_name: '駒井一輝',
      listen_count: 9
    },
    {
      artist_mbid: null,
      artist_name: 'La Secta AllStar • Gustavo Laureano',
      listen_count: 8
    },
    {
      artist_mbid: 'e9235369-ddb5-4418-bd98-48af40d6b782',
      artist_name: '島翔太朗',
      listen_count: 7
    },
    {
      artist_mbid: '45300cc2-40eb-4a7e-9776-f52fd806557c',
      artist_name: '岩田匡治',
      listen_count: 7
    },
    {
      artist_mbid: null,
      artist_name: 'Koichi Sugiyama',
      listen_count: 7
    },
    {
      artist_mbid: '7eefee0b-118a-4a7e-80c0-947116f504f7',
      artist_name: '森下弘生',
      listen_count: 6
    },
    {
      artist_mbid: '7fc1bf89-c8d5-4f75-b870-2d2429b5218a',
      artist_name: 'レモネードファクトリー',
      listen_count: 6
    },
    {
      artist_mbid: '294b9510-d1c5-4c1e-842a-62351f94e046',
      artist_name: 'Wilkins',
      listen_count: 6
    },
    {
      artist_mbid: '8d1134ea-693e-41b1-984e-29a2ca3cc3fb',
      artist_name: 'Vivanativa',
      listen_count: 6
    },
    {
      artist_mbid: '4db2c734-a1c5-488a-af7a-18bd899b2ef6',
      artist_name: '馬場康久',
      listen_count: 5
    }
  ]
}
Requesting.respond {
  request: '019a5193-6013-7141-a309-0c8701772b38',
  artists: [
    {
      artist_mbid: 'd1ab501b-0674-40b4-97b3-ea416fb634db',
      artist_name: '駒井一輝',
      listen_count: 9
    },
    {
      artist_mbid: null,
      artist_name: 'La Secta AllStar • Gustavo Laureano',
      listen_count: 8
    },
    {
      artist_mbid: 'e9235369-ddb5-4418-bd98-48af40d6b782',
      artist_name: '島翔太朗',
      listen_count: 7
    },
    {
      artist_mbid: '45300cc2-40eb-4a7e-9776-f52fd806557c',
      artist_name: '岩田匡治',
      listen_count: 7
    },
    {
      artist_mbid: null,
      artist_name: 'Koichi Sugiyama',
      listen_count: 7
    },
    {
      artist_mbid: '7eefee0b-118a-4a7e-80c0-947116f504f7',
      artist_name: '森下弘生',
      listen_count: 6
    },
    {
      artist_mbid: '7fc1bf89-c8d5-4f75-b870-2d2429b5218a',
      artist_name: 'レモネードファクトリー',
      listen_count: 6
    },
    {
      artist_mbid: '294b9510-d1c5-4c1e-842a-62351f94e046',
      artist_name: 'Wilkins',
      listen_count: 6
    },
    {
      artist_mbid: '8d1134ea-693e-41b1-984e-29a2ca3cc3fb',
      artist_name: 'Vivanativa',
      listen_count: 6
    },
    {
      artist_mbid: '4db2c734-a1c5-488a-af7a-18bd899b2ef6',
      artist_name: '馬場康久',
      listen_count: 5
    }
  ]
} => { request: '019a5193-6013-7141-a309-0c8701772b38' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopRecordings
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0,
  path: '/ListenBrainzAPI/getTopRecordings'
} => { request: '019a5193-6757-76bc-896c-fb3732290a83' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopRecordings
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0,
  path: '/ListenBrainzAPI/getTopRecordings'
} => { request: '019a5193-67fd-7379-9142-2da33cbb7e89' }
ListenBrainzAPI.getTopRecordings {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0
} => {
  recordings: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 22,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Salto Mortal'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 19,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Siente El Fuego'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 15,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Culpable'
    },
    {
      artist_mbids: [Array],
      artist_name: '鈴木光人',
      artists: [Array],
      caa_id: 38512076168,
      caa_release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      listen_count: 10,
      recording_mbid: '2c1712d3-3cfe-43d0-bd65-b2aafa7fddf3',
      release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      release_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack ～Special edit version～',
      track_name: 'クレイジーモーターサイクル -夜をぶっとばせ-'
    },
    {
      artist_mbids: [Array],
      artist_name: '小塚良太',
      artists: [Array],
      caa_id: 32169341510,
      caa_release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      listen_count: 10,
      recording_mbid: 'c276aa83-837b-46df-a97f-f6aa1d022036',
      release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      release_name: '真・女神転生V オリジナル・サウンドトラック',
      track_name: 'Battle -eon-'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 9,
      recording_mbid: 'ba36cc9e-7077-4a2a-a63c-e87ea08b0ef0',
      release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      release_name: 'Fuego',
      track_name: 'Déjalos que hablen'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17719961627,
      caa_release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      listen_count: 8,
      recording_mbid: 'f91844c8-336c-440c-811c-aece6851156b',
      release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      release_name: 'Consejo',
      track_name: 'Comedia de amor'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 8,
      recording_mbid: '5401becb-ab7b-4632-81ef-0ec0824f5002',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: 'Antidote'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 7,
      recording_mbid: 'e7ed8f90-3f9f-45b8-ab0f-771efedcee44',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: '橋上の戦い'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 7,
      recording_mbid: 'b9ecdd3a-728f-49c7-93fa-7c7a9590e4d9',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Village'
    }
  ]
}
Requesting.respond {
  request: '019a5193-6757-76bc-896c-fb3732290a83',
  recordings: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 22,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Salto Mortal'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 19,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Siente El Fuego'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 15,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Culpable'
    },
    {
      artist_mbids: [Array],
      artist_name: '鈴木光人',
      artists: [Array],
      caa_id: 38512076168,
      caa_release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      listen_count: 10,
      recording_mbid: '2c1712d3-3cfe-43d0-bd65-b2aafa7fddf3',
      release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      release_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack ～Special edit version～',
      track_name: 'クレイジーモーターサイクル -夜をぶっとばせ-'
    },
    {
      artist_mbids: [Array],
      artist_name: '小塚良太',
      artists: [Array],
      caa_id: 32169341510,
      caa_release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      listen_count: 10,
      recording_mbid: 'c276aa83-837b-46df-a97f-f6aa1d022036',
      release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      release_name: '真・女神転生V オリジナル・サウンドトラック',
      track_name: 'Battle -eon-'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 9,
      recording_mbid: 'ba36cc9e-7077-4a2a-a63c-e87ea08b0ef0',
      release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      release_name: 'Fuego',
      track_name: 'Déjalos que hablen'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17719961627,
      caa_release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      listen_count: 8,
      recording_mbid: 'f91844c8-336c-440c-811c-aece6851156b',
      release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      release_name: 'Consejo',
      track_name: 'Comedia de amor'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 8,
      recording_mbid: '5401becb-ab7b-4632-81ef-0ec0824f5002',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: 'Antidote'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 7,
      recording_mbid: 'e7ed8f90-3f9f-45b8-ab0f-771efedcee44',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: '橋上の戦い'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 7,
      recording_mbid: 'b9ecdd3a-728f-49c7-93fa-7c7a9590e4d9',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Village'
    }
  ]
} => { request: '019a5193-6757-76bc-896c-fb3732290a83' }
ListenBrainzAPI.getTopRecordings {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0
} => {
  recordings: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 22,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Salto Mortal'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 19,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Siente El Fuego'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 15,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Culpable'
    },
    {
      artist_mbids: [Array],
      artist_name: '鈴木光人',
      artists: [Array],
      caa_id: 38512076168,
      caa_release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      listen_count: 10,
      recording_mbid: '2c1712d3-3cfe-43d0-bd65-b2aafa7fddf3',
      release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      release_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack ～Special edit version～',
      track_name: 'クレイジーモーターサイクル -夜をぶっとばせ-'
    },
    {
      artist_mbids: [Array],
      artist_name: '小塚良太',
      artists: [Array],
      caa_id: 32169341510,
      caa_release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      listen_count: 10,
      recording_mbid: 'c276aa83-837b-46df-a97f-f6aa1d022036',
      release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      release_name: '真・女神転生V オリジナル・サウンドトラック',
      track_name: 'Battle -eon-'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 9,
      recording_mbid: 'ba36cc9e-7077-4a2a-a63c-e87ea08b0ef0',
      release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      release_name: 'Fuego',
      track_name: 'Déjalos que hablen'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17719961627,
      caa_release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      listen_count: 8,
      recording_mbid: 'f91844c8-336c-440c-811c-aece6851156b',
      release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      release_name: 'Consejo',
      track_name: 'Comedia de amor'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 8,
      recording_mbid: '5401becb-ab7b-4632-81ef-0ec0824f5002',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: 'Antidote'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 7,
      recording_mbid: 'e7ed8f90-3f9f-45b8-ab0f-771efedcee44',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: '橋上の戦い'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 7,
      recording_mbid: 'b9ecdd3a-728f-49c7-93fa-7c7a9590e4d9',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Village'
    }
  ]
}
Requesting.respond {
  request: '019a5193-67fd-7379-9142-2da33cbb7e89',
  recordings: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 22,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Salto Mortal'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 19,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Siente El Fuego'
    },
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 15,
      recording_mbid: null,
      release_mbid: null,
      release_name: 'Fuego',
      track_name: 'Culpable'
    },
    {
      artist_mbids: [Array],
      artist_name: '鈴木光人',
      artists: [Array],
      caa_id: 38512076168,
      caa_release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      listen_count: 10,
      recording_mbid: '2c1712d3-3cfe-43d0-bd65-b2aafa7fddf3',
      release_mbid: '139f3172-07da-488b-a4f2-3c6162a2f7cd',
      release_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack ～Special edit version～',
      track_name: 'クレイジーモーターサイクル -夜をぶっとばせ-'
    },
    {
      artist_mbids: [Array],
      artist_name: '小塚良太',
      artists: [Array],
      caa_id: 32169341510,
      caa_release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      listen_count: 10,
      recording_mbid: 'c276aa83-837b-46df-a97f-f6aa1d022036',
      release_mbid: '9204113e-74c8-4f10-9b84-82e82e5bd4ae',
      release_name: '真・女神転生V オリジナル・サウンドトラック',
      track_name: 'Battle -eon-'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 9,
      recording_mbid: 'ba36cc9e-7077-4a2a-a63c-e87ea08b0ef0',
      release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      release_name: 'Fuego',
      track_name: 'Déjalos que hablen'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17719961627,
      caa_release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      listen_count: 8,
      recording_mbid: 'f91844c8-336c-440c-811c-aece6851156b',
      release_mbid: 'fe6d3271-5d2c-4c58-bff5-0414697f7dfb',
      release_name: 'Consejo',
      track_name: 'Comedia de amor'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 8,
      recording_mbid: '5401becb-ab7b-4632-81ef-0ec0824f5002',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: 'Antidote'
    },
    {
      artist_mbids: [Array],
      artist_name: '崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 7,
      recording_mbid: 'e7ed8f90-3f9f-45b8-ab0f-771efedcee44',
      release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      release_name: 'FINAL FANTASY TACTICS Original Sound Track',
      track_name: '橋上の戦い'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 7,
      recording_mbid: 'b9ecdd3a-728f-49c7-93fa-7c7a9590e4d9',
      release_mbid: 'c363556a-c2dd-41d3-84ac-462be367a8ab',
      release_name: 'Dragon Quest III',
      track_name: 'Village'
    }
  ]
} => { request: '019a5193-67fd-7379-9142-2da33cbb7e89' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopReleaseGroups
[Requesting] Received request for path: /ListenBrainzAPI/getTopReleaseGroups
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0,
  path: '/ListenBrainzAPI/getTopReleaseGroups'
} => { request: '019a5193-bbf0-7cb1-b6ba-4a4df2515929' }
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0,
  path: '/ListenBrainzAPI/getTopReleaseGroups'
} => { request: '019a5193-bc01-76cd-9c3d-da66df864e0c' }
ListenBrainzAPI.getTopReleaseGroups {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0
} => {
  releaseGroups: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 63,
      release_group_mbid: null,
      release_group_name: 'Fuego'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 38520712642,
      caa_release_mbid: '46c801e1-0b74-4674-bacf-66567abe82d8',
      listen_count: 43,
      release_group_mbid: 'beb22d58-426c-424a-8ed6-6b4859f3c1e0',
      release_group_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '岩田匡治 & 崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 43,
      release_group_mbid: '77f7682d-f156-39a6-9517-9e275e4e4ffa',
      release_group_name: 'FINAL FANTASY TACTICS Original Sound Track'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17720017464,
      caa_release_mbid: '38ca081c-f7cf-451b-9a30-af7975bbc967',
      listen_count: 27,
      release_group_mbid: '47d1d14d-c222-392c-b7bd-131951b574d8',
      release_group_name: 'Consejo'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 21,
      release_group_mbid: '5a584180-068d-4d17-9432-392b3de80a3d',
      release_group_name: 'Dragon Quest III'
    },
    {
      artist_mbids: [Array],
      artist_name: 'INTELLIGENT SYSTEMS',
      artists: [Array],
      caa_id: 38366843044,
      caa_release_mbid: '296e9d97-34d9-4fb4-8734-2b73954e4de7',
      listen_count: 18,
      release_group_mbid: '5dc35388-84a5-4182-8beb-24ef30bf00f3',
      release_group_name: 'FIRE EMBLEM ENGAGE ORIGINAL SOUNDTRACK'
    },
    {
      artist_mbids: [Array],
      artist_name: 'snowpoint lounge',
      artists: [Array],
      caa_id: 38628849632,
      caa_release_mbid: '3cc2b1fd-9198-4998-8026-164eddae0995',
      listen_count: 16,
      release_group_mbid: '49bcd16f-148b-4594-8dac-7b248b4e2ae3',
      release_group_name: 'FRONTIER ワンダーランド'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 26777865177,
      caa_release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      listen_count: 15,
      release_group_mbid: '3bca75b1-aff1-4ea1-8476-8d8f4b83d5ee',
      release_group_name: 'そよ風アパートメント201'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 8837373509,
      caa_release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      listen_count: 12,
      release_group_mbid: 'd04d5c97-13b8-4161-9c70-033115a0fe6d',
      release_group_name: 'ゆめ'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 11,
      release_group_mbid: '77aab40f-1502-4f43-828e-8358cbcdd730',
      release_group_name: 'Fuego'
    }
  ]
}
Requesting.respond {
  request: '019a5193-bbf0-7cb1-b6ba-4a4df2515929',
  releaseGroups: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 63,
      release_group_mbid: null,
      release_group_name: 'Fuego'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 38520712642,
      caa_release_mbid: '46c801e1-0b74-4674-bacf-66567abe82d8',
      listen_count: 43,
      release_group_mbid: 'beb22d58-426c-424a-8ed6-6b4859f3c1e0',
      release_group_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '岩田匡治 & 崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 43,
      release_group_mbid: '77f7682d-f156-39a6-9517-9e275e4e4ffa',
      release_group_name: 'FINAL FANTASY TACTICS Original Sound Track'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17720017464,
      caa_release_mbid: '38ca081c-f7cf-451b-9a30-af7975bbc967',
      listen_count: 27,
      release_group_mbid: '47d1d14d-c222-392c-b7bd-131951b574d8',
      release_group_name: 'Consejo'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 21,
      release_group_mbid: '5a584180-068d-4d17-9432-392b3de80a3d',
      release_group_name: 'Dragon Quest III'
    },
    {
      artist_mbids: [Array],
      artist_name: 'INTELLIGENT SYSTEMS',
      artists: [Array],
      caa_id: 38366843044,
      caa_release_mbid: '296e9d97-34d9-4fb4-8734-2b73954e4de7',
      listen_count: 18,
      release_group_mbid: '5dc35388-84a5-4182-8beb-24ef30bf00f3',
      release_group_name: 'FIRE EMBLEM ENGAGE ORIGINAL SOUNDTRACK'
    },
    {
      artist_mbids: [Array],
      artist_name: 'snowpoint lounge',
      artists: [Array],
      caa_id: 38628849632,
      caa_release_mbid: '3cc2b1fd-9198-4998-8026-164eddae0995',
      listen_count: 16,
      release_group_mbid: '49bcd16f-148b-4594-8dac-7b248b4e2ae3',
      release_group_name: 'FRONTIER ワンダーランド'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 26777865177,
      caa_release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      listen_count: 15,
      release_group_mbid: '3bca75b1-aff1-4ea1-8476-8d8f4b83d5ee',
      release_group_name: 'そよ風アパートメント201'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 8837373509,
      caa_release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      listen_count: 12,
      release_group_mbid: 'd04d5c97-13b8-4161-9c70-033115a0fe6d',
      release_group_name: 'ゆめ'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 11,
      release_group_mbid: '77aab40f-1502-4f43-828e-8358cbcdd730',
      release_group_name: 'Fuego'
    }
  ]
} => { request: '019a5193-bbf0-7cb1-b6ba-4a4df2515929' }
ListenBrainzAPI.getTopReleaseGroups {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_week',
  count: 10,
  offset: 0
} => {
  releaseGroups: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 63,
      release_group_mbid: null,
      release_group_name: 'Fuego'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 38520712642,
      caa_release_mbid: '46c801e1-0b74-4674-bacf-66567abe82d8',
      listen_count: 43,
      release_group_mbid: 'beb22d58-426c-424a-8ed6-6b4859f3c1e0',
      release_group_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '岩田匡治 & 崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 43,
      release_group_mbid: '77f7682d-f156-39a6-9517-9e275e4e4ffa',
      release_group_name: 'FINAL FANTASY TACTICS Original Sound Track'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17720017464,
      caa_release_mbid: '38ca081c-f7cf-451b-9a30-af7975bbc967',
      listen_count: 27,
      release_group_mbid: '47d1d14d-c222-392c-b7bd-131951b574d8',
      release_group_name: 'Consejo'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 21,
      release_group_mbid: '5a584180-068d-4d17-9432-392b3de80a3d',
      release_group_name: 'Dragon Quest III'
    },
    {
      artist_mbids: [Array],
      artist_name: 'INTELLIGENT SYSTEMS',
      artists: [Array],
      caa_id: 38366843044,
      caa_release_mbid: '296e9d97-34d9-4fb4-8734-2b73954e4de7',
      listen_count: 18,
      release_group_mbid: '5dc35388-84a5-4182-8beb-24ef30bf00f3',
      release_group_name: 'FIRE EMBLEM ENGAGE ORIGINAL SOUNDTRACK'
    },
    {
      artist_mbids: [Array],
      artist_name: 'snowpoint lounge',
      artists: [Array],
      caa_id: 38628849632,
      caa_release_mbid: '3cc2b1fd-9198-4998-8026-164eddae0995',
      listen_count: 16,
      release_group_mbid: '49bcd16f-148b-4594-8dac-7b248b4e2ae3',
      release_group_name: 'FRONTIER ワンダーランド'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 26777865177,
      caa_release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      listen_count: 15,
      release_group_mbid: '3bca75b1-aff1-4ea1-8476-8d8f4b83d5ee',
      release_group_name: 'そよ風アパートメント201'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 8837373509,
      caa_release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      listen_count: 12,
      release_group_mbid: 'd04d5c97-13b8-4161-9c70-033115a0fe6d',
      release_group_name: 'ゆめ'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 11,
      release_group_mbid: '77aab40f-1502-4f43-828e-8358cbcdd730',
      release_group_name: 'Fuego'
    }
  ]
}
Requesting.respond {
  request: '019a5193-bc01-76cd-9c3d-da66df864e0c',
  releaseGroups: [
    {
      artist_mbids: [],
      artist_name: 'La Secta AllStar',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 63,
      release_group_mbid: null,
      release_group_name: 'Fuego'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 38520712642,
      caa_release_mbid: '46c801e1-0b74-4674-bacf-66567abe82d8',
      listen_count: 43,
      release_group_mbid: 'beb22d58-426c-424a-8ed6-6b4859f3c1e0',
      release_group_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '岩田匡治 & 崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 43,
      release_group_mbid: '77f7682d-f156-39a6-9517-9e275e4e4ffa',
      release_group_name: 'FINAL FANTASY TACTICS Original Sound Track'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17720017464,
      caa_release_mbid: '38ca081c-f7cf-451b-9a30-af7975bbc967',
      listen_count: 27,
      release_group_mbid: '47d1d14d-c222-392c-b7bd-131951b574d8',
      release_group_name: 'Consejo'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Koichi Sugiyama',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 21,
      release_group_mbid: '5a584180-068d-4d17-9432-392b3de80a3d',
      release_group_name: 'Dragon Quest III'
    },
    {
      artist_mbids: [Array],
      artist_name: 'INTELLIGENT SYSTEMS',
      artists: [Array],
      caa_id: 38366843044,
      caa_release_mbid: '296e9d97-34d9-4fb4-8734-2b73954e4de7',
      listen_count: 18,
      release_group_mbid: '5dc35388-84a5-4182-8beb-24ef30bf00f3',
      release_group_name: 'FIRE EMBLEM ENGAGE ORIGINAL SOUNDTRACK'
    },
    {
      artist_mbids: [Array],
      artist_name: 'snowpoint lounge',
      artists: [Array],
      caa_id: 38628849632,
      caa_release_mbid: '3cc2b1fd-9198-4998-8026-164eddae0995',
      listen_count: 16,
      release_group_mbid: '49bcd16f-148b-4594-8dac-7b248b4e2ae3',
      release_group_name: 'FRONTIER ワンダーランド'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 26777865177,
      caa_release_mbid: 'bf755950-37db-43da-ae6b-d51f4d8143d7',
      listen_count: 15,
      release_group_mbid: '3bca75b1-aff1-4ea1-8476-8d8f4b83d5ee',
      release_group_name: 'そよ風アパートメント201'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Lamp',
      artists: [Array],
      caa_id: 8837373509,
      caa_release_mbid: '15a991b2-c3ef-4475-ae96-fcff38406305',
      listen_count: 12,
      release_group_mbid: 'd04d5c97-13b8-4161-9c70-033115a0fe6d',
      release_group_name: 'ゆめ'
    },
    {
      artist_mbids: [Array],
      artist_name: 'La Secta AllStar',
      artists: [Array],
      caa_id: 17720033190,
      caa_release_mbid: 'b891b0c2-11a9-4cd3-9fad-028633eaa615',
      listen_count: 11,
      release_group_mbid: '77aab40f-1502-4f43-828e-8358cbcdd730',
      release_group_name: 'Fuego'
    }
  ]
} => { request: '019a5193-bc01-76cd-9c3d-da66df864e0c' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopReleaseGroups
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_year',
  count: 10,
  offset: 0,
  path: '/ListenBrainzAPI/getTopReleaseGroups'
} => { request: '019a5193-d1f4-7982-ae15-fa8f7b93dbbd' }
ListenBrainzAPI.getDailyActivity {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_year'
} => {
  dailyActivity: {
    Friday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Monday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Saturday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Sunday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Thursday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Tuesday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Wednesday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ]
  },
  from_ts: 1735689600,
  to_ts: 1767225600,
  last_updated: 1762226972,
  stats_range: undefined,
  user_id: 'yahello'
}
ListenBrainzAPI.getDailyActivity {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_year'
} => {
  dailyActivity: {
    Friday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Monday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Saturday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Sunday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Thursday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Tuesday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    Wednesday: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object]
    ]
  },
  from_ts: 1735689600,
  to_ts: 1767225600,
  last_updated: 1762226972,
  stats_range: null,
  user_id: 'yahello'
}
ListenBrainzAPI.getTopReleaseGroups {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_year',
  count: 10,
  offset: 0
} => {
  releaseGroups: [
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 38520712642,
      caa_release_mbid: '46c801e1-0b74-4674-bacf-66567abe82d8',
      listen_count: 2026,
      release_group_mbid: 'beb22d58-426c-424a-8ed6-6b4859f3c1e0',
      release_group_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '浜渦正志, 水田直志 & 鈴木光人',
      artists: [Array],
      caa_id: 5804449946,
      caa_release_mbid: 'a2f4803a-2a75-4170-9b60-d9b2e595f0c5',
      listen_count: 961,
      release_group_mbid: '295b1be9-50e9-4b68-aa6c-6dbd8ae8e1ab',
      release_group_name: 'FINAL FANTASY XIII-2 Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '浜渦正志',
      artists: [Array],
      caa_id: 18463299461,
      caa_release_mbid: '775fead4-9e4b-40d7-a5de-10767d5e13c1',
      listen_count: 943,
      release_group_mbid: '0086e4d5-f724-40d0-948f-d0b8a46b342a',
      release_group_name: 'FINAL FANTASY XIII Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 26369762125,
      caa_release_mbid: '9bb970b5-31f2-456e-acea-2206c89b6ba9',
      listen_count: 712,
      release_group_mbid: '860ef6e3-5c3e-465b-861f-a2899b74b59d',
      release_group_name: 'FINAL FANTASY VII REMAKE Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '一之瀬剛, 佐藤仁美 & 前馬宏充',
      artists: [Array],
      caa_id: 38154078634,
      caa_release_mbid: 'cb66f950-30c4-4f61-b9c5-dffed05701ad',
      listen_count: 608,
      release_group_mbid: 'c167e701-d9d6-4ecf-b216-a2d047a090a4',
      release_group_name: 'Pokémon LEGENDS アルセウス'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Shota Kageyama & GAME FREAK',
      artists: [Array],
      caa_id: 31172834201,
      caa_release_mbid: 'a67c02c0-70b4-48de-a24e-424e86c5a8f1',
      listen_count: 562,
      release_group_mbid: 'a53ad478-2b8c-436f-a217-74ecba877afc',
      release_group_name: 'Pokémon Brilliant Diamond & Shining Pearl: Super Music Collection'
    },
    {
      artist_mbids: [Array],
      artist_name: '浜渦正志, 水田直志 & 鈴木光人',
      artists: [Array],
      caa_id: 6354193080,
      caa_release_mbid: 'de919534-f10c-44c5-8c5c-ae72fa2a12e1',
      listen_count: 556,
      release_group_mbid: '001563d9-7fb9-4982-b0e4-b77537c12bdb',
      release_group_name: 'LIGHTNING RETURNS:FINAL FANTASY XIII ORIGINAL SOUNDTRACK'
    },
    {
      artist_mbids: [Array],
      artist_name: '光田康典 / ACE(工藤ともり、CHiCO) / 平松建治 / 清田愛未 / 下村陽子 / マリアム・アボンナサー / 救仁郷裕',
      artists: [Array],
      caa_id: 35805965440,
      caa_release_mbid: '8f4bc93a-9cd9-406e-931e-87a826c2e47f',
      listen_count: 330,
      release_group_mbid: '360e5c9f-0938-47c6-ba33-dc9579d78a69',
      release_group_name: 'ゼノブレイド オリジナル・サウンドトラック トリニティBOX'
    },
    {
      artist_mbids: [Array],
      artist_name: 'GAME FREAK',
      artists: [Array],
      caa_id: 37678220609,
      caa_release_mbid: 'c3680da0-d87a-4f89-b21a-a72cc2434352',
      listen_count: 324,
      release_group_mbid: 'ff44363f-b52f-453f-9be4-16842f5f22bc',
      release_group_name: 'Pokémon Diamond & Pokémon Pearl Super Music Collection'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Omori',
      artists: [Array],
      caa_id: 32307917052,
      caa_release_mbid: 'c6c2a65e-4781-4a84-ad7b-9d070f4a2814',
      listen_count: 291,
      release_group_mbid: 'e73acc2f-40c2-4b66-a3ce-1df3208dea04',
      release_group_name: 'Omori: Original Game Soundtrack'
    }
  ]
}
Requesting.respond {
  request: '019a5193-d1f4-7982-ae15-fa8f7b93dbbd',
  releaseGroups: [
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 38520712642,
      caa_release_mbid: '46c801e1-0b74-4674-bacf-66567abe82d8',
      listen_count: 2026,
      release_group_mbid: 'beb22d58-426c-424a-8ed6-6b4859f3c1e0',
      release_group_name: 'FINAL FANTASY VII REBIRTH Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '浜渦正志, 水田直志 & 鈴木光人',
      artists: [Array],
      caa_id: 5804449946,
      caa_release_mbid: 'a2f4803a-2a75-4170-9b60-d9b2e595f0c5',
      listen_count: 961,
      release_group_mbid: '295b1be9-50e9-4b68-aa6c-6dbd8ae8e1ab',
      release_group_name: 'FINAL FANTASY XIII-2 Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '浜渦正志',
      artists: [Array],
      caa_id: 18463299461,
      caa_release_mbid: '775fead4-9e4b-40d7-a5de-10767d5e13c1',
      listen_count: 943,
      release_group_mbid: '0086e4d5-f724-40d0-948f-d0b8a46b342a',
      release_group_name: 'FINAL FANTASY XIII Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 26369762125,
      caa_release_mbid: '9bb970b5-31f2-456e-acea-2206c89b6ba9',
      listen_count: 712,
      release_group_mbid: '860ef6e3-5c3e-465b-861f-a2899b74b59d',
      release_group_name: 'FINAL FANTASY VII REMAKE Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: '一之瀬剛, 佐藤仁美 & 前馬宏充',
      artists: [Array],
      caa_id: 38154078634,
      caa_release_mbid: 'cb66f950-30c4-4f61-b9c5-dffed05701ad',
      listen_count: 608,
      release_group_mbid: 'c167e701-d9d6-4ecf-b216-a2d047a090a4',
      release_group_name: 'Pokémon LEGENDS アルセウス'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Shota Kageyama & GAME FREAK',
      artists: [Array],
      caa_id: 31172834201,
      caa_release_mbid: 'a67c02c0-70b4-48de-a24e-424e86c5a8f1',
      listen_count: 562,
      release_group_mbid: 'a53ad478-2b8c-436f-a217-74ecba877afc',
      release_group_name: 'Pokémon Brilliant Diamond & Shining Pearl: Super Music Collection'
    },
    {
      artist_mbids: [Array],
      artist_name: '浜渦正志, 水田直志 & 鈴木光人',
      artists: [Array],
      caa_id: 6354193080,
      caa_release_mbid: 'de919534-f10c-44c5-8c5c-ae72fa2a12e1',
      listen_count: 556,
      release_group_mbid: '001563d9-7fb9-4982-b0e4-b77537c12bdb',
      release_group_name: 'LIGHTNING RETURNS:FINAL FANTASY XIII ORIGINAL SOUNDTRACK'
    },
    {
      artist_mbids: [Array],
      artist_name: '光田康典 / ACE(工藤ともり、CHiCO) / 平松建治 / 清田愛未 / 下村陽子 / マリアム・アボンナサー / 救仁郷裕',
      artists: [Array],
      caa_id: 35805965440,
      caa_release_mbid: '8f4bc93a-9cd9-406e-931e-87a826c2e47f',
      listen_count: 330,
      release_group_mbid: '360e5c9f-0938-47c6-ba33-dc9579d78a69',
      release_group_name: 'ゼノブレイド オリジナル・サウンドトラック トリニティBOX'
    },
    {
      artist_mbids: [Array],
      artist_name: 'GAME FREAK',
      artists: [Array],
      caa_id: 37678220609,
      caa_release_mbid: 'c3680da0-d87a-4f89-b21a-a72cc2434352',
      listen_count: 324,
      release_group_mbid: 'ff44363f-b52f-453f-9be4-16842f5f22bc',
      release_group_name: 'Pokémon Diamond & Pokémon Pearl Super Music Collection'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Omori',
      artists: [Array],
      caa_id: 32307917052,
      caa_release_mbid: 'c6c2a65e-4781-4a84-ad7b-9d070f4a2814',
      listen_count: 291,
      release_group_mbid: 'e73acc2f-40c2-4b66-a3ce-1df3208dea04',
      release_group_name: 'Omori: Original Game Soundtrack'
    }
  ]
} => { request: '019a5193-d1f4-7982-ae15-fa8f7b93dbbd' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopReleaseGroups
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_year',
  count: 10,
  offset: 10,
  path: '/ListenBrainzAPI/getTopReleaseGroups'
} => { request: '019a5193-dfef-7d9b-ab83-6b127dbc0654' }
ListenBrainzAPI.getTopReleaseGroups {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_year',
  count: 10,
  offset: 10
} => {
  releaseGroups: [
    {
      artist_mbids: [Array],
      artist_name: '植松伸夫',
      artists: [Array],
      caa_id: 7073551471,
      caa_release_mbid: '9fcf9bd4-4ad7-41ba-bfed-52a96968b96e',
      listen_count: 242,
      release_group_mbid: '7fa54428-2300-3d01-882e-8403cd138ffe',
      release_group_name: 'FINAL FANTASY VIII オリジナル・サウンドトラック'
    },
    {
      artist_mbids: [Array],
      artist_name: '一之瀬剛 & 足立美奈子',
      artists: [Array],
      caa_id: 37680947778,
      caa_release_mbid: '3aaa3a63-2a28-4385-8713-4524260947aa',
      listen_count: 229,
      release_group_mbid: '927f7852-c3ce-456c-a3f5-663680174b91',
      release_group_name: 'ポケットモンスター ソード / ポケットモンスター シールド'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 36671826498,
      caa_release_mbid: '55a83433-ffe0-491b-af00-79630b83e2bb',
      listen_count: 200,
      release_group_mbid: '3c895784-91a7-499f-b29d-7c34830250a2',
      release_group_name: 'Nintendo Switch ポケモン スカーレット・バイオレット+ゼロの秘宝 スーパーミュージック・コレクション'
    },
    {
      artist_mbids: [Array],
      artist_name: 'アトラスサウンドチーム',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 184,
      release_group_mbid: null,
      release_group_name: 'ペルソナ５ ザ・ロイヤル サウンドトラック'
    },
    {
      artist_mbids: [Array],
      artist_name: '*Namco Consumer Sound Team',
      artists: [Array],
      caa_id: 18581902315,
      caa_release_mbid: '60531d3c-f1e6-3159-b9ee-91ebdef1fbaa',
      listen_count: 176,
      release_group_mbid: '4575c397-aef0-3a45-b664-7c2370dda6d0',
      release_group_name: 'R4 / RIDGE RACER TYPE 4 / DIRECT AUDIO'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Twofive',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 167,
      release_group_mbid: '175e504e-1c25-4e11-a68b-cb29648da39b',
      release_group_name: 'Miagete Goran, Yozora no Hoshi wo Complete Soundtrack "Full of Stars & Little Planets"'
    },
    {
      artist_mbids: [Array],
      artist_name: '桜庭統',
      artists: [Array],
      caa_id: 32697688942,
      caa_release_mbid: '9799c1c3-bffb-4475-8ab9-4103554446b0',
      listen_count: 156,
      release_group_mbid: 'e8848939-ea57-410a-859c-c4896a9e7af4',
      release_group_name: 'Golden Sun'
    },
    {
      artist_mbids: [Array],
      artist_name: '岩田匡治 & 崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 155,
      release_group_mbid: '77f7682d-f156-39a6-9517-9e275e4e4ffa',
      release_group_name: 'FINAL FANTASY TACTICS Original Sound Track'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 28122049558,
      caa_release_mbid: '9462195d-baf6-485c-b2f3-bbc422aa3c8e',
      listen_count: 154,
      release_group_mbid: 'f5256055-f3bf-4a34-a47f-038130be05a8',
      release_group_name: 'FINAL FANTASY VII REMAKE Original Soundtrack Plus'
    },
    {
      artist_mbids: [Array],
      artist_name: '下村陽子',
      artists: [Array],
      caa_id: 16579747062,
      caa_release_mbid: 'cc716887-be12-3d0c-a7ae-34d2c6fa5613',
      listen_count: 150,
      release_group_mbid: 'a1273258-87eb-4134-b9d7-2603d85388b4',
      release_group_name: 'Kingdom Hearts Original Soundtrack'
    }
  ]
}
Requesting.respond {
  request: '019a5193-dfef-7d9b-ab83-6b127dbc0654',
  releaseGroups: [
    {
      artist_mbids: [Array],
      artist_name: '植松伸夫',
      artists: [Array],
      caa_id: 7073551471,
      caa_release_mbid: '9fcf9bd4-4ad7-41ba-bfed-52a96968b96e',
      listen_count: 242,
      release_group_mbid: '7fa54428-2300-3d01-882e-8403cd138ffe',
      release_group_name: 'FINAL FANTASY VIII オリジナル・サウンドトラック'
    },
    {
      artist_mbids: [Array],
      artist_name: '一之瀬剛 & 足立美奈子',
      artists: [Array],
      caa_id: 37680947778,
      caa_release_mbid: '3aaa3a63-2a28-4385-8713-4524260947aa',
      listen_count: 229,
      release_group_mbid: '927f7852-c3ce-456c-a3f5-663680174b91',
      release_group_name: 'ポケットモンスター ソード / ポケットモンスター シールド'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 36671826498,
      caa_release_mbid: '55a83433-ffe0-491b-af00-79630b83e2bb',
      listen_count: 200,
      release_group_mbid: '3c895784-91a7-499f-b29d-7c34830250a2',
      release_group_name: 'Nintendo Switch ポケモン スカーレット・バイオレット+ゼロの秘宝 スーパーミュージック・コレクション'
    },
    {
      artist_mbids: [Array],
      artist_name: 'アトラスサウンドチーム',
      artists: null,
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 184,
      release_group_mbid: null,
      release_group_name: 'ペルソナ５ ザ・ロイヤル サウンドトラック'
    },
    {
      artist_mbids: [Array],
      artist_name: '*Namco Consumer Sound Team',
      artists: [Array],
      caa_id: 18581902315,
      caa_release_mbid: '60531d3c-f1e6-3159-b9ee-91ebdef1fbaa',
      listen_count: 176,
      release_group_mbid: '4575c397-aef0-3a45-b664-7c2370dda6d0',
      release_group_name: 'R4 / RIDGE RACER TYPE 4 / DIRECT AUDIO'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Twofive',
      artists: [Array],
      caa_id: null,
      caa_release_mbid: null,
      listen_count: 167,
      release_group_mbid: '175e504e-1c25-4e11-a68b-cb29648da39b',
      release_group_name: 'Miagete Goran, Yozora no Hoshi wo Complete Soundtrack "Full of Stars & Little Planets"'
    },
    {
      artist_mbids: [Array],
      artist_name: '桜庭統',
      artists: [Array],
      caa_id: 32697688942,
      caa_release_mbid: '9799c1c3-bffb-4475-8ab9-4103554446b0',
      listen_count: 156,
      release_group_mbid: 'e8848939-ea57-410a-859c-c4896a9e7af4',
      release_group_name: 'Golden Sun'
    },
    {
      artist_mbids: [Array],
      artist_name: '岩田匡治 & 崎元仁',
      artists: [Array],
      caa_id: 29669354361,
      caa_release_mbid: '58639926-8fd0-467a-8da2-4cb9e9452386',
      listen_count: 155,
      release_group_mbid: '77f7682d-f156-39a6-9517-9e275e4e4ffa',
      release_group_name: 'FINAL FANTASY TACTICS Original Sound Track'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 28122049558,
      caa_release_mbid: '9462195d-baf6-485c-b2f3-bbc422aa3c8e',
      listen_count: 154,
      release_group_mbid: 'f5256055-f3bf-4a34-a47f-038130be05a8',
      release_group_name: 'FINAL FANTASY VII REMAKE Original Soundtrack Plus'
    },
    {
      artist_mbids: [Array],
      artist_name: '下村陽子',
      artists: [Array],
      caa_id: 16579747062,
      caa_release_mbid: 'cc716887-be12-3d0c-a7ae-34d2c6fa5613',
      listen_count: 150,
      release_group_mbid: 'a1273258-87eb-4134-b9d7-2603d85388b4',
      release_group_name: 'Kingdom Hearts Original Soundtrack'
    }
  ]
} => { request: '019a5193-dfef-7d9b-ab83-6b127dbc0654' }
[Requesting] Received request for path: /ListenBrainzAPI/getTopReleaseGroups
Requesting.request {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_year',
  count: 10,
  offset: 20,
  path: '/ListenBrainzAPI/getTopReleaseGroups'
} => { request: '019a5193-ebee-7828-bedc-81857c2128ad' }
ListenBrainzAPI.getTopReleaseGroups {
  user: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  scrobbleToken: '93d5a239-6437-4c0f-8dbf-14a0580c5c5d',
  timeRange: 'this_year',
  count: 10,
  offset: 20
} => {
  releaseGroups: [
    {
      artist_mbids: [Array],
      artist_name: 'Bad Bunny',
      artists: [Array],
      caa_id: 40857018101,
      caa_release_mbid: 'c9e6b642-a6d9-4b22-8ec1-16c47b6143fc',
      listen_count: 142,
      release_group_mbid: 'b3073a10-2d7c-484c-b387-e49ae629da3d',
      release_group_name: 'DeBÍ TiRAR MáS FOToS'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Laufey',
      artists: [Array],
      caa_id: 40902396945,
      caa_release_mbid: '068d71c0-c698-4d07-9763-46155e4f8809',
      listen_count: 141,
      release_group_mbid: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      release_group_name: 'Bewitched'
    },
    {
      artist_mbids: [Array],
      artist_name: '目黒将司',
      artists: [Array],
      caa_id: 37267425071,
      caa_release_mbid: 'cfd65dac-0861-4249-9728-0fba35706d6a',
      listen_count: 136,
      release_group_mbid: 'b5bc44a2-0b43-36eb-8ec5-f2642e979e5b',
      release_group_name: '「ペルソナ3」オリジナル・サウンドトラック'
    },
    {
      artist_mbids: [Array],
      artist_name: '祖堅正慶',
      artists: [Array],
      caa_id: 32116136481,
      caa_release_mbid: 'b5f2fdc7-f6b0-49f1-acbd-489fc49f0bf7',
      listen_count: 136,
      release_group_mbid: '8c65c54c-1a43-42dc-8471-17dfb5c9e08e',
      release_group_name: 'ENDWALKER: FINAL FANTASY XIV Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Famishin',
      artists: [Array],
      caa_id: 30966813415,
      caa_release_mbid: '597a16f7-c02a-4213-bb39-503b49c6ed9a',
      listen_count: 134,
      release_group_mbid: '78971fa6-515e-4d44-ad2f-5ba763b4d0ed',
      release_group_name: 'DRACU-RIOT! オリジナル・サウンドトラック'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 16710682941,
      caa_release_mbid: '039d0182-e2ff-4c2f-9026-3d3f94acad79',
      listen_count: 133,
      release_group_mbid: '6931cf9a-815d-4308-ab30-f571e9079f26',
      release_group_name: 'ニンテンドーDS ポケモンブラック・ホワイト スーパーミュージックコレクション'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 40392893819,
      caa_release_mbid: 'e8a207b7-59b5-4b1b-8f0c-8b43fe0d0f55',
      listen_count: 127,
      release_group_mbid: 'a91bc7e7-c8f0-4829-85fb-af997c15b137',
      release_group_name: 'FINAL FANTASY VII REBIRTH GOLD SAUCER & MINIGAME DISC'
    },
    {
      artist_mbids: [Array],
      artist_name: 'sora tob sakana',
      artists: [Array],
      caa_id: 33359186642,
      caa_release_mbid: '2ca28ddd-c168-4de1-b74c-e85d3bf27d30',
      listen_count: 120,
      release_group_mbid: '2a424ff8-80a9-49e4-a905-430430610976',
      release_group_name: 'sora tob sakana'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Alliance Japan',
      artists: [Array],
      caa_id: 10806999544,
      caa_release_mbid: '1bef5bfd-5470-483a-9f40-49823e1320b0',
      listen_count: 120,
      release_group_mbid: '339d6c4b-eda3-48c4-b7fb-1fdedc0db279',
      release_group_name: 'FINAL FANTASY COLLECTION FOR A CAPPELLA: Selected by Original Soundtrack "FINAL FANTASY I~Type-0"'
    },
    {
      artist_mbids: [Array],
      artist_name: '光田康典',
      artists: [Array],
      caa_id: 13320267000,
      caa_release_mbid: 'e9e4fa0f-43dd-3690-a645-65365c13189f',
      listen_count: 116,
      release_group_mbid: '9e5bbb98-c915-314a-871a-eab6ed7dc6f5',
      release_group_name: 'クロノ・トリガー オリジナル・サウンド・ヴァージョン'
    }
  ]
}
Requesting.respond {
  request: '019a5193-ebee-7828-bedc-81857c2128ad',
  releaseGroups: [
    {
      artist_mbids: [Array],
      artist_name: 'Bad Bunny',
      artists: [Array],
      caa_id: 40857018101,
      caa_release_mbid: 'c9e6b642-a6d9-4b22-8ec1-16c47b6143fc',
      listen_count: 142,
      release_group_mbid: 'b3073a10-2d7c-484c-b387-e49ae629da3d',
      release_group_name: 'DeBÍ TiRAR MáS FOToS'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Laufey',
      artists: [Array],
      caa_id: 40902396945,
      caa_release_mbid: '068d71c0-c698-4d07-9763-46155e4f8809',
      listen_count: 141,
      release_group_mbid: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      release_group_name: 'Bewitched'
    },
    {
      artist_mbids: [Array],
      artist_name: '目黒将司',
      artists: [Array],
      caa_id: 37267425071,
      caa_release_mbid: 'cfd65dac-0861-4249-9728-0fba35706d6a',
      listen_count: 136,
      release_group_mbid: 'b5bc44a2-0b43-36eb-8ec5-f2642e979e5b',
      release_group_name: '「ペルソナ3」オリジナル・サウンドトラック'
    },
    {
      artist_mbids: [Array],
      artist_name: '祖堅正慶',
      artists: [Array],
      caa_id: 32116136481,
      caa_release_mbid: 'b5f2fdc7-f6b0-49f1-acbd-489fc49f0bf7',
      listen_count: 136,
      release_group_mbid: '8c65c54c-1a43-42dc-8471-17dfb5c9e08e',
      release_group_name: 'ENDWALKER: FINAL FANTASY XIV Original Soundtrack'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Famishin',
      artists: [Array],
      caa_id: 30966813415,
      caa_release_mbid: '597a16f7-c02a-4213-bb39-503b49c6ed9a',
      listen_count: 134,
      release_group_mbid: '78971fa6-515e-4d44-ad2f-5ba763b4d0ed',
      release_group_name: 'DRACU-RIOT! オリジナル・サウンドトラック'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 16710682941,
      caa_release_mbid: '039d0182-e2ff-4c2f-9026-3d3f94acad79',
      listen_count: 133,
      release_group_mbid: '6931cf9a-815d-4308-ab30-f571e9079f26',
      release_group_name: 'ニンテンドーDS ポケモンブラック・ホワイト スーパーミュージックコレクション'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Various Artists',
      artists: [Array],
      caa_id: 40392893819,
      caa_release_mbid: 'e8a207b7-59b5-4b1b-8f0c-8b43fe0d0f55',
      listen_count: 127,
      release_group_mbid: 'a91bc7e7-c8f0-4829-85fb-af997c15b137',
      release_group_name: 'FINAL FANTASY VII REBIRTH GOLD SAUCER & MINIGAME DISC'
    },
    {
      artist_mbids: [Array],
      artist_name: 'sora tob sakana',
      artists: [Array],
      caa_id: 33359186642,
      caa_release_mbid: '2ca28ddd-c168-4de1-b74c-e85d3bf27d30',
      listen_count: 120,
      release_group_mbid: '2a424ff8-80a9-49e4-a905-430430610976',
      release_group_name: 'sora tob sakana'
    },
    {
      artist_mbids: [Array],
      artist_name: 'Alliance Japan',
      artists: [Array],
      caa_id: 10806999544,
      caa_release_mbid: '1bef5bfd-5470-483a-9f40-49823e1320b0',
      listen_count: 120,
      release_group_mbid: '339d6c4b-eda3-48c4-b7fb-1fdedc0db279',
      release_group_name: 'FINAL FANTASY COLLECTION FOR A CAPPELLA: Selected by Original Soundtrack "FINAL FANTASY I~Type-0"'
    },
    {
      artist_mbids: [Array],
      artist_name: '光田康典',
      artists: [Array],
      caa_id: 13320267000,
      caa_release_mbid: 'e9e4fa0f-43dd-3690-a645-65365c13189f',
      listen_count: 116,
      release_group_mbid: '9e5bbb98-c915-314a-871a-eab6ed7dc6f5',
      release_group_name: 'クロノ・トリガー オリジナル・サウンド・ヴァージョン'
    }
  ]
} => { request: '019a5193-ebee-7828-bedc-81857c2128ad' }
Recommendation.getRecommendations {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  item: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 3,
  feedbacked: false
} => { itemsWithReasoning: [] }
MusicBrainzAPI.getEntityGenres {
  mbid: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  entityType: 'release-group'
} => {
  genres: [
    {
      disambiguation: '',
      id: 'c88a8b97-ba4b-4d45-916f-4c4a779ccd89',
      name: 'jazz pop',
      count: 2
    },
    {
      id: '782dc157-d1a5-42b9-9174-d329c24a7ef3',
      name: 'vocal jazz',
      disambiguation: '',
      count: 2
    },
    {
      name: 'bossa nova',
      id: '573a284f-2ae3-4636-af36-10fc1078d295',
      disambiguation: '',
      count: 1
    },
    {
      count: 1,
      disambiguation: '',
      name: 'easy listening',
      id: 'ca06817d-8622-4120-b49d-96921c8bb767'
    },
    {
      count: 1,
      id: 'a715278f-1580-409f-8078-4ffbc800e08b',
      name: 'jazz',
      disambiguation: ''
    },
    {
      count: 1,
      disambiguation: '',
      name: 'singer-songwriter',
      id: '455f264b-db00-4716-991d-fbd32dc24523'
    },
    {
      name: 'traditional pop',
      id: '70c145aa-fed6-4b20-9d75-48b2c3b208f2',
      disambiguation: '',
      count: 1
    }
  ],
  tags: [
    { count: 2, name: 'jazz pop' },
    { count: 2, name: 'vocal jazz' },
    { count: 1, name: '1–4 wochen' },
    { name: 'bossa nova', count: 1 },
    { name: 'easy listening', count: 1 },
    { name: 'jazz', count: 1 },
    { name: 'offizielle charts', count: 1 },
    { count: 1, name: 'singer-songwriter' },
    { name: 'traditional pop', count: 1 }
  ]
}
tags for release group  82c93285-46d7-4f44-ba7c-2c420cfc7665 :  [
  { name: "jazz pop", count: 2 },
  { name: "vocal jazz", count: 2 },
  { count: 1, name: "1–4 wochen" },
  { name: "bossa nova", count: 1 },
  { name: "easy listening", count: 1 },
  { count: 1, name: "jazz" },
  { count: 1, name: "offizielle charts" },
  { count: 1, name: "singer-songwriter" },
  { name: "traditional pop", count: 1 }
]
Processed tag "jazz pop" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 10
Processed tag "vocal jazz" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 20
Processed tag "1–4 wochen" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 30
Processed tag "bossa nova" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 40
MusicBrainzAPI.getSimilarReleaseGroups { releaseGroupMbid: '82c93285-46d7-4f44-ba7c-2c420cfc7665', limit: 10 } => {
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      title: 'The Manhattan Transfer Anthology: Down in Birdland',
      artist: 'The Manhattan Transfer',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      title: 'All This Time',
      artist: 'Sting',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      title: 'La storia di Valentina Monetta',
      artist: 'Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      title: 'Such a Night',
      artist: 'BOSCO jazz & pop orchestra',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      title: "Rosie Solves the Swingin' Riddle",
      artist: 'Rosemary Clooney',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      title: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      artist: 'Joe Williams',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      title: 'Softly',
      artist: 'Shirley Horn',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      title: 'Seasons of a Life',
      artist: 'Lena Horne',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      title: 'Too Young to Go Steady / Never Let Me Go',
      artist: 'Nat King Cole',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      title: 'Love Is What Stays',
      artist: 'Mark Murphy',
      score: 12.83,
      sharedGenres: [Array]
    }
  ]
}
[Requesting] Received request for path: /Recommendation/generate
Requesting.request {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  sourceItem: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 3,
  sourceItemMetadata: {
    id: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
    name: 'Bewitched',
    title: 'Bewitched',
    type: 'release-group',
    disambiguation: '',
    description: '',
    genres: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    tags: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  similarArtists: [],
  similarRecordings: [],
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      name: 'The Manhattan Transfer Anthology: Down in Birdland',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      name: 'All This Time',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      name: 'La storia di Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      name: 'Such a Night',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      name: "Rosie Solves the Swingin' Riddle",
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      name: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      name: 'Softly',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      name: 'Seasons of a Life',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      name: 'Too Young to Go Steady / Never Let Me Go',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      name: 'Love Is What Stays',
      score: 12.83,
      sharedGenres: [Array]
    }
  ],
  path: '/Recommendation/generate'
} => { request: '019a5194-1ba2-7973-8df0-5d61d93245b0' }
Building recommendation prompt for user 019a2dd8-d972-7c32-8902-c381bdfa1976
Source item: {
  id: "82c93285-46d7-4f44-ba7c-2c420cfc7665",
  name: "Bewitched",
  title: "Bewitched",
  type: "release-group",
  disambiguation: "",
  description: "",
  genres: [
    { name: "jazz pop", count: 2 },
    { name: "vocal jazz", count: 2 },
    { name: "bossa nova", count: 1 },
    { name: "easy listening", count: 1 },
    { name: "jazz", count: 1 },
    { name: "singer-songwriter", count: 1 },
    { name: "traditional pop", count: 1 }
  ],
  tags: [
    { name: "jazz pop", count: 2 },
    { name: "vocal jazz", count: 2 },
    { name: "1–4 wochen", count: 1 },
    { name: "bossa nova", count: 1 },
    { name: "easy listening", count: 1 },
    { name: "jazz", count: 1 },
    { name: "offizielle charts", count: 1 },
    { name: "singer-songwriter", count: 1 },
    { name: "traditional pop", count: 1 }
  ]
}
Amount: 3
Source genres: jazz pop, vocal jazz, bossa nova, easy listening, jazz, singer-songwriter, traditional pop
Source tags: jazz pop, vocal jazz, 1–4 wochen, bossa nova, easy listening, jazz, offizielle charts, singer-songwriter, traditional pop
MB relationships: [
  "- Similar Albums/Release Groups (10 total):\n" +
    '  • "The Manhattan Transfer Anthology: Down in Birdland" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "All This Time" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "La storia di Valentina Monetta" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "Such a Night" - Score: 12.83, Genres: [jazz pop]\n' +
    `  • "Rosie Solves the Swingin' Riddle" - Score: 12.83, Genres: [vocal jazz]\n` +
    '  • "The Greatest!: Count Basie Plays, Joe Williams Sings Standards" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Softly" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Seasons of a Life" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Too Young to Go Steady / Never Let Me Go" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Love Is What Stays" - Score: 12.83, Genres: [vocal jazz]'
]
Positive feedback: 
Negative feedback: 
LLM response: ```json
[
  {
    "name": "The Manhattan Transfer - Anthology: Down in Birdland",
    "reasoning": "This album shares the jazz pop genre, featuring sophisticated vocal arrangements and a blend of swing and modern jazz influences.",
    "confidence": 0.9
  },
  {
    "name": "Joe Williams - The Greatest!: Count Basie Plays, Joe Williams Sings Standards",
    "reasoning": "This album falls into the vocal jazz genre, offering powerful male vocals backed by a renowned big band, similar to the classic vocal jazz elements of Bewitched.",
    "confidence": 0.85
  },
  {
    "name": "Rosie - Rosie Solves the Swingin' Riddle",
    "reasoning": "This record is in the vocal jazz style, known for its playful and swinging interpretations of standards with a distinct vocal personality.",
    "confidence": 0.83
  }
]
```
Recommendation.generate {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  sourceItem: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 3,
  sourceItemMetadata: {
    id: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
    name: 'Bewitched',
    title: 'Bewitched',
    type: 'release-group',
    disambiguation: '',
    description: '',
    genres: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    tags: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  similarArtists: [],
  similarRecordings: [],
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      name: 'The Manhattan Transfer Anthology: Down in Birdland',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      name: 'All This Time',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      name: 'La storia di Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      name: 'Such a Night',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      name: "Rosie Solves the Swingin' Riddle",
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      name: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      name: 'Softly',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      name: 'Seasons of a Life',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      name: 'Too Young to Go Steady / Never Let Me Go',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      name: 'Love Is What Stays',
      score: 12.83,
      sharedGenres: [Array]
    }
  ]
} => {
  recommendations: [
    {
      _id: '019a5194-215f-772c-a2a9-a25b88403c2b',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:the-manhattan-transfer---anthology--down-in-birdland:1762305253727',
      itemName: 'The Manhattan Transfer - Anthology: Down in Birdland',
      reasoning: 'This album shares the jazz pop genre, featuring sophisticated vocal arrangements and a blend of swing and modern jazz influences.',
      confidence: 0.9,
      feedback: null,
      createdAt: 2025-11-05T01:14:13.727Z
    },
    {
      _id: '019a5194-215f-7aa4-8cd1-eff129df0104',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:joe-williams---the-greatest---count-basie-plays--joe-williams-sings-standards:1762305253727',
      itemName: 'Joe Williams - The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      reasoning: 'This album falls into the vocal jazz genre, offering powerful male vocals backed by a renowned big band, similar to the classic vocal jazz elements of Bewitched.',
      confidence: 0.85,
      feedback: null,
      createdAt: 2025-11-05T01:14:13.727Z
    },
    {
      _id: '019a5194-215f-71e4-aa19-eec342b97a2d',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:rosie---rosie-solves-the-swingin--riddle:1762305253727',
      itemName: "Rosie - Rosie Solves the Swingin' Riddle",
      reasoning: 'This record is in the vocal jazz style, known for its playful and swinging interpretations of standards with a distinct vocal personality.',
      confidence: 0.83,
      feedback: null,
      createdAt: 2025-11-05T01:14:13.727Z
    }
  ]
}
Requesting.respond {
  request: '019a5194-1ba2-7973-8df0-5d61d93245b0',
  recommendations: [
    {
      _id: '019a5194-215f-772c-a2a9-a25b88403c2b',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:the-manhattan-transfer---anthology--down-in-birdland:1762305253727',
      itemName: 'The Manhattan Transfer - Anthology: Down in Birdland',
      reasoning: 'This album shares the jazz pop genre, featuring sophisticated vocal arrangements and a blend of swing and modern jazz influences.',
      confidence: 0.9,
      feedback: null,
      createdAt: 2025-11-05T01:14:13.727Z
    },
    {
      _id: '019a5194-215f-7aa4-8cd1-eff129df0104',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:joe-williams---the-greatest---count-basie-plays--joe-williams-sings-standards:1762305253727',
      itemName: 'Joe Williams - The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      reasoning: 'This album falls into the vocal jazz genre, offering powerful male vocals backed by a renowned big band, similar to the classic vocal jazz elements of Bewitched.',
      confidence: 0.85,
      feedback: null,
      createdAt: 2025-11-05T01:14:13.727Z
    },
    {
      _id: '019a5194-215f-71e4-aa19-eec342b97a2d',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:rosie---rosie-solves-the-swingin--riddle:1762305253727',
      itemName: "Rosie - Rosie Solves the Swingin' Riddle",
      reasoning: 'This record is in the vocal jazz style, known for its playful and swinging interpretations of standards with a distinct vocal personality.',
      confidence: 0.83,
      feedback: null,
      createdAt: 2025-11-05T01:14:13.727Z
    }
  ]
} => { request: '019a5194-1ba2-7973-8df0-5d61d93245b0' }
Recommendation.getRecommendations {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  item: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 3,
  feedbacked: false
} => {
  itemsWithReasoning: [
    {
      item: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:the-manhattan-transfer---anthology--down-in-birdland:1762305253727',
      itemName: 'The Manhattan Transfer - Anthology: Down in Birdland',
      reasoning: 'This album shares the jazz pop genre, featuring sophisticated vocal arrangements and a blend of swing and modern jazz influences.',
      confidence: 0.9
    },
    {
      item: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:joe-williams---the-greatest---count-basie-plays--joe-williams-sings-standards:1762305253727',
      itemName: 'Joe Williams - The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      reasoning: 'This album falls into the vocal jazz genre, offering powerful male vocals backed by a renowned big band, similar to the classic vocal jazz elements of Bewitched.',
      confidence: 0.85
    },
    {
      item: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:rosie---rosie-solves-the-swingin--riddle:1762305253727',
      itemName: "Rosie - Rosie Solves the Swingin' Riddle",
      reasoning: 'This record is in the vocal jazz style, known for its playful and swinging interpretations of standards with a distinct vocal personality.',
      confidence: 0.83
    }
  ]
}
Recommendation.provideFeedback {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  recommendedItem: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:joe-williams---the-greatest---count-basie-plays--joe-williams-sings-standards:1762305253727',
  feedback: true
} => {}
MusicBrainzAPI.getEntityGenres {
  mbid: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  entityType: 'release-group'
} => {
  genres: [
    {
      disambiguation: '',
      id: 'c88a8b97-ba4b-4d45-916f-4c4a779ccd89',
      name: 'jazz pop',
      count: 2
    },
    {
      id: '782dc157-d1a5-42b9-9174-d329c24a7ef3',
      name: 'vocal jazz',
      disambiguation: '',
      count: 2
    },
    {
      name: 'bossa nova',
      id: '573a284f-2ae3-4636-af36-10fc1078d295',
      disambiguation: '',
      count: 1
    },
    {
      count: 1,
      disambiguation: '',
      name: 'easy listening',
      id: 'ca06817d-8622-4120-b49d-96921c8bb767'
    },
    {
      count: 1,
      id: 'a715278f-1580-409f-8078-4ffbc800e08b',
      name: 'jazz',
      disambiguation: ''
    },
    {
      count: 1,
      disambiguation: '',
      name: 'singer-songwriter',
      id: '455f264b-db00-4716-991d-fbd32dc24523'
    },
    {
      name: 'traditional pop',
      id: '70c145aa-fed6-4b20-9d75-48b2c3b208f2',
      disambiguation: '',
      count: 1
    }
  ],
  tags: [
    { count: 2, name: 'jazz pop' },
    { count: 2, name: 'vocal jazz' },
    { count: 1, name: '1–4 wochen' },
    { name: 'bossa nova', count: 1 },
    { name: 'easy listening', count: 1 },
    { name: 'jazz', count: 1 },
    { name: 'offizielle charts', count: 1 },
    { count: 1, name: 'singer-songwriter' },
    { name: 'traditional pop', count: 1 }
  ]
}
tags for release group  82c93285-46d7-4f44-ba7c-2c420cfc7665 :  [
  { name: "jazz pop", count: 2 },
  { name: "vocal jazz", count: 2 },
  { count: 1, name: "1–4 wochen" },
  { name: "bossa nova", count: 1 },
  { name: "easy listening", count: 1 },
  { count: 1, name: "jazz" },
  { count: 1, name: "offizielle charts" },
  { count: 1, name: "singer-songwriter" },
  { name: "traditional pop", count: 1 }
]
Processed tag "jazz pop" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 10
Processed tag "vocal jazz" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 20
Processed tag "1–4 wochen" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 30
Processed tag "bossa nova" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 40
MusicBrainzAPI.getSimilarReleaseGroups { releaseGroupMbid: '82c93285-46d7-4f44-ba7c-2c420cfc7665', limit: 10 } => {
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      title: 'The Manhattan Transfer Anthology: Down in Birdland',
      artist: 'The Manhattan Transfer',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      title: 'All This Time',
      artist: 'Sting',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      title: 'La storia di Valentina Monetta',
      artist: 'Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      title: 'Such a Night',
      artist: 'BOSCO jazz & pop orchestra',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      title: "Rosie Solves the Swingin' Riddle",
      artist: 'Rosemary Clooney',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      title: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      artist: 'Joe Williams',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      title: 'Softly',
      artist: 'Shirley Horn',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      title: 'Seasons of a Life',
      artist: 'Lena Horne',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      title: 'Too Young to Go Steady / Never Let Me Go',
      artist: 'Nat King Cole',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      title: 'Love Is What Stays',
      artist: 'Mark Murphy',
      score: 12.83,
      sharedGenres: [Array]
    }
  ]
}
[Requesting] Received request for path: /Recommendation/generate
Requesting.request {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  sourceItem: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 1,
  sourceItemMetadata: {
    id: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
    name: 'Bewitched',
    title: 'Bewitched',
    type: 'release-group',
    disambiguation: '',
    description: '',
    genres: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    tags: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  similarArtists: [],
  similarRecordings: [],
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      name: 'The Manhattan Transfer Anthology: Down in Birdland',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      name: 'All This Time',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      name: 'La storia di Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      name: 'Such a Night',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      name: "Rosie Solves the Swingin' Riddle",
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      name: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      name: 'Softly',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      name: 'Seasons of a Life',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      name: 'Too Young to Go Steady / Never Let Me Go',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      name: 'Love Is What Stays',
      score: 12.83,
      sharedGenres: [Array]
    }
  ],
  path: '/Recommendation/generate'
} => { request: '019a5194-554b-7ed3-aa34-347783124c1d' }
Building recommendation prompt for user 019a2dd8-d972-7c32-8902-c381bdfa1976
Source item: {
  id: "82c93285-46d7-4f44-ba7c-2c420cfc7665",
  name: "Bewitched",
  title: "Bewitched",
  type: "release-group",
  disambiguation: "",
  description: "",
  genres: [
    { name: "jazz pop", count: 2 },
    { name: "vocal jazz", count: 2 },
    { name: "bossa nova", count: 1 },
    { name: "easy listening", count: 1 },
    { name: "jazz", count: 1 },
    { name: "singer-songwriter", count: 1 },
    { name: "traditional pop", count: 1 }
  ],
  tags: [
    { name: "jazz pop", count: 2 },
    { name: "vocal jazz", count: 2 },
    { name: "1–4 wochen", count: 1 },
    { name: "bossa nova", count: 1 },
    { name: "easy listening", count: 1 },
    { name: "jazz", count: 1 },
    { name: "offizielle charts", count: 1 },
    { name: "singer-songwriter", count: 1 },
    { name: "traditional pop", count: 1 }
  ]
}
Amount: 1
Source genres: jazz pop, vocal jazz, bossa nova, easy listening, jazz, singer-songwriter, traditional pop
Source tags: jazz pop, vocal jazz, 1–4 wochen, bossa nova, easy listening, jazz, offizielle charts, singer-songwriter, traditional pop
MB relationships: [
  "- Similar Albums/Release Groups (10 total):\n" +
    '  • "The Manhattan Transfer Anthology: Down in Birdland" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "All This Time" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "La storia di Valentina Monetta" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "Such a Night" - Score: 12.83, Genres: [jazz pop]\n' +
    `  • "Rosie Solves the Swingin' Riddle" - Score: 12.83, Genres: [vocal jazz]\n` +
    '  • "The Greatest!: Count Basie Plays, Joe Williams Sings Standards" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Softly" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Seasons of a Life" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Too Young to Go Steady / Never Let Me Go" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Love Is What Stays" - Score: 12.83, Genres: [vocal jazz]'
]
Positive feedback: - Item: Joe Williams - The Greatest!: Count Basie Plays, Joe Williams Sings Standards (Source: 82c93285-46d7-4f44-ba7c-2c420cfc7665), Reasoning: This album falls into the vocal jazz genre, offering powerful male vocals backed by a renowned big band, similar to the classic vocal jazz elements of Bewitched.
Negative feedback: 
LLM response: ```json
[
  {
    "name": "Various Artists - Softly",
    "reasoning": "This compilation delves into vocal jazz, showcasing smooth vocal performances over classic jazz arrangements, much like the intimate feel of Bewitched.",
    "confidence": 0.80
  }
]
```
Recommendation.generate {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  sourceItem: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 1,
  sourceItemMetadata: {
    id: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
    name: 'Bewitched',
    title: 'Bewitched',
    type: 'release-group',
    disambiguation: '',
    description: '',
    genres: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    tags: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  similarArtists: [],
  similarRecordings: [],
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      name: 'The Manhattan Transfer Anthology: Down in Birdland',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      name: 'All This Time',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      name: 'La storia di Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      name: 'Such a Night',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      name: "Rosie Solves the Swingin' Riddle",
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      name: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      name: 'Softly',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      name: 'Seasons of a Life',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      name: 'Too Young to Go Steady / Never Let Me Go',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      name: 'Love Is What Stays',
      score: 12.83,
      sharedGenres: [Array]
    }
  ]
} => {
  recommendations: [
    {
      _id: '019a5194-59c9-716a-8c44-6a142cf69cef',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:various-artists---softly:1762305268169',
      itemName: 'Various Artists - Softly',
      reasoning: 'This compilation delves into vocal jazz, showcasing smooth vocal performances over classic jazz arrangements, much like the intimate feel of Bewitched.',
      confidence: 0.8,
      feedback: null,
      createdAt: 2025-11-05T01:14:28.169Z
    }
  ]
}
Requesting.respond {
  request: '019a5194-554b-7ed3-aa34-347783124c1d',
  recommendations: [
    {
      _id: '019a5194-59c9-716a-8c44-6a142cf69cef',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:various-artists---softly:1762305268169',
      itemName: 'Various Artists - Softly',
      reasoning: 'This compilation delves into vocal jazz, showcasing smooth vocal performances over classic jazz arrangements, much like the intimate feel of Bewitched.',
      confidence: 0.8,
      feedback: null,
      createdAt: 2025-11-05T01:14:28.169Z
    }
  ]
} => { request: '019a5194-554b-7ed3-aa34-347783124c1d' }
Recommendation.getRecommendations {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  item: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 1,
  feedbacked: false,
  ignore: [
    'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:the-manhattan-transfer---anthology--down-in-birdland:1762305253727',
    'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:rosie---rosie-solves-the-swingin--riddle:1762305253727'
  ]
} => {
  itemsWithReasoning: [
    {
      item: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:various-artists---softly:1762305268169',
      itemName: 'Various Artists - Softly',
      reasoning: 'This compilation delves into vocal jazz, showcasing smooth vocal performances over classic jazz arrangements, much like the intimate feel of Bewitched.',
      confidence: 0.8
    }
  ]
}
Recommendation.provideFeedback {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  recommendedItem: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:various-artists---softly:1762305268169',
  feedback: false
} => {}
MusicBrainzAPI.getEntityGenres {
  mbid: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  entityType: 'release-group'
} => {
  genres: [
    {
      disambiguation: '',
      id: 'c88a8b97-ba4b-4d45-916f-4c4a779ccd89',
      name: 'jazz pop',
      count: 2
    },
    {
      id: '782dc157-d1a5-42b9-9174-d329c24a7ef3',
      name: 'vocal jazz',
      disambiguation: '',
      count: 2
    },
    {
      name: 'bossa nova',
      id: '573a284f-2ae3-4636-af36-10fc1078d295',
      disambiguation: '',
      count: 1
    },
    {
      count: 1,
      disambiguation: '',
      name: 'easy listening',
      id: 'ca06817d-8622-4120-b49d-96921c8bb767'
    },
    {
      count: 1,
      id: 'a715278f-1580-409f-8078-4ffbc800e08b',
      name: 'jazz',
      disambiguation: ''
    },
    {
      count: 1,
      disambiguation: '',
      name: 'singer-songwriter',
      id: '455f264b-db00-4716-991d-fbd32dc24523'
    },
    {
      name: 'traditional pop',
      id: '70c145aa-fed6-4b20-9d75-48b2c3b208f2',
      disambiguation: '',
      count: 1
    }
  ],
  tags: [
    { count: 2, name: 'jazz pop' },
    { count: 2, name: 'vocal jazz' },
    { count: 1, name: '1–4 wochen' },
    { name: 'bossa nova', count: 1 },
    { name: 'easy listening', count: 1 },
    { name: 'jazz', count: 1 },
    { name: 'offizielle charts', count: 1 },
    { count: 1, name: 'singer-songwriter' },
    { name: 'traditional pop', count: 1 }
  ]
}
tags for release group  82c93285-46d7-4f44-ba7c-2c420cfc7665 :  [
  { name: "jazz pop", count: 2 },
  { name: "vocal jazz", count: 2 },
  { count: 1, name: "1–4 wochen" },
  { name: "bossa nova", count: 1 },
  { name: "easy listening", count: 1 },
  { count: 1, name: "jazz" },
  { count: 1, name: "offizielle charts" },
  { count: 1, name: "singer-songwriter" },
  { name: "traditional pop", count: 1 }
]
Processed tag "jazz pop" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 10
Processed tag "vocal jazz" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 20
Processed tag "1–4 wochen" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 30
Processed tag "bossa nova" for release-group 82c93285-46d7-4f44-ba7c-2c420cfc7665; candidates: 40
MusicBrainzAPI.getSimilarReleaseGroups { releaseGroupMbid: '82c93285-46d7-4f44-ba7c-2c420cfc7665', limit: 10 } => {
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      title: 'The Manhattan Transfer Anthology: Down in Birdland',
      artist: 'The Manhattan Transfer',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      title: 'All This Time',
      artist: 'Sting',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      title: 'La storia di Valentina Monetta',
      artist: 'Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      title: 'Such a Night',
      artist: 'BOSCO jazz & pop orchestra',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      title: "Rosie Solves the Swingin' Riddle",
      artist: 'Rosemary Clooney',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      title: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      artist: 'Joe Williams',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      title: 'Softly',
      artist: 'Shirley Horn',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      title: 'Seasons of a Life',
      artist: 'Lena Horne',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      title: 'Too Young to Go Steady / Never Let Me Go',
      artist: 'Nat King Cole',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      title: 'Love Is What Stays',
      artist: 'Mark Murphy',
      score: 12.83,
      sharedGenres: [Array]
    }
  ]
}
[Requesting] Received request for path: /Recommendation/generate
Requesting.request {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  sourceItem: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 1,
  sourceItemMetadata: {
    id: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
    name: 'Bewitched',
    title: 'Bewitched',
    type: 'release-group',
    disambiguation: '',
    description: '',
    genres: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    tags: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  similarArtists: [],
  similarRecordings: [],
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      name: 'The Manhattan Transfer Anthology: Down in Birdland',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      name: 'All This Time',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      name: 'La storia di Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      name: 'Such a Night',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      name: "Rosie Solves the Swingin' Riddle",
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      name: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      name: 'Softly',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      name: 'Seasons of a Life',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      name: 'Too Young to Go Steady / Never Let Me Go',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      name: 'Love Is What Stays',
      score: 12.83,
      sharedGenres: [Array]
    }
  ],
  path: '/Recommendation/generate'
} => { request: '019a5194-6ee6-7ac4-9c62-4767b643d8ff' }
Building recommendation prompt for user 019a2dd8-d972-7c32-8902-c381bdfa1976
Source item: {
  id: "82c93285-46d7-4f44-ba7c-2c420cfc7665",
  name: "Bewitched",
  title: "Bewitched",
  type: "release-group",
  disambiguation: "",
  description: "",
  genres: [
    { name: "jazz pop", count: 2 },
    { name: "vocal jazz", count: 2 },
    { name: "bossa nova", count: 1 },
    { name: "easy listening", count: 1 },
    { name: "jazz", count: 1 },
    { name: "singer-songwriter", count: 1 },
    { name: "traditional pop", count: 1 }
  ],
  tags: [
    { name: "jazz pop", count: 2 },
    { name: "vocal jazz", count: 2 },
    { name: "1–4 wochen", count: 1 },
    { name: "bossa nova", count: 1 },
    { name: "easy listening", count: 1 },
    { name: "jazz", count: 1 },
    { name: "offizielle charts", count: 1 },
    { name: "singer-songwriter", count: 1 },
    { name: "traditional pop", count: 1 }
  ]
}
Amount: 1
Source genres: jazz pop, vocal jazz, bossa nova, easy listening, jazz, singer-songwriter, traditional pop
Source tags: jazz pop, vocal jazz, 1–4 wochen, bossa nova, easy listening, jazz, offizielle charts, singer-songwriter, traditional pop
MB relationships: [
  "- Similar Albums/Release Groups (10 total):\n" +
    '  • "The Manhattan Transfer Anthology: Down in Birdland" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "All This Time" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "La storia di Valentina Monetta" - Score: 12.83, Genres: [jazz pop]\n' +
    '  • "Such a Night" - Score: 12.83, Genres: [jazz pop]\n' +
    `  • "Rosie Solves the Swingin' Riddle" - Score: 12.83, Genres: [vocal jazz]\n` +
    '  • "The Greatest!: Count Basie Plays, Joe Williams Sings Standards" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Softly" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Seasons of a Life" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Too Young to Go Steady / Never Let Me Go" - Score: 12.83, Genres: [vocal jazz]\n' +
    '  • "Love Is What Stays" - Score: 12.83, Genres: [vocal jazz]'
]
Positive feedback: - Item: Joe Williams - The Greatest!: Count Basie Plays, Joe Williams Sings Standards (Source: 82c93285-46d7-4f44-ba7c-2c420cfc7665), Reasoning: This album falls into the vocal jazz genre, offering powerful male vocals backed by a renowned big band, similar to the classic vocal jazz elements of Bewitched.
Negative feedback: - Item: Various Artists - Softly (Source: 82c93285-46d7-4f44-ba7c-2c420cfc7665), Reasoning: This compilation delves into vocal jazz, showcasing smooth vocal performances over classic jazz arrangements, much like the intimate feel of Bewitched.
LLM response: ```json
[
  {
    "name": "All This Time",
    "reasoning": "This album falls within the jazz pop genre, much like Bewitched, and likely features similar accessible vocal arrangements with a sophisticated jazz sensibility.",
    "confidence": 0.80
  }
]
```
Recommendation.generate {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  sourceItem: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 1,
  sourceItemMetadata: {
    id: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
    name: 'Bewitched',
    title: 'Bewitched',
    type: 'release-group',
    disambiguation: '',
    description: '',
    genres: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    tags: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  similarArtists: [],
  similarRecordings: [],
  similarReleaseGroups: [
    {
      mbid: '2aa0e18d-fc6c-35f2-af1e-418c40bc81b5',
      name: 'The Manhattan Transfer Anthology: Down in Birdland',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'd0a80fe4-e8bc-471c-bd65-11dcea8a976e',
      name: 'All This Time',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '9b35fe90-3407-4651-aaf1-6b6f7388939e',
      name: 'La storia di Valentina Monetta',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: 'fcf30a1d-63cc-4f87-a24f-fa70baeb58ee',
      name: 'Such a Night',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '18e34501-aae4-3c16-9d1b-7a2b81378576',
      name: "Rosie Solves the Swingin' Riddle",
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '67cebd88-310e-376b-ba32-b0c3c5f7184b',
      name: 'The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '1e68aa39-5ccb-30ef-9f30-3a71ecabba76',
      name: 'Softly',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '2111243d-5bfb-35ad-919f-bf3f2f2327a2',
      name: 'Seasons of a Life',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '4d4dd29b-4a20-3a96-8d85-7f9ff7b4121b',
      name: 'Too Young to Go Steady / Never Let Me Go',
      score: 12.83,
      sharedGenres: [Array]
    },
    {
      mbid: '5c7bf11b-0d33-3a0b-8acd-173afa687a51',
      name: 'Love Is What Stays',
      score: 12.83,
      sharedGenres: [Array]
    }
  ]
} => {
  recommendations: [
    {
      _id: '019a5194-72b1-7f26-8ea9-1eba6e740a39',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:all-this-time:1762305274545',
      itemName: 'All This Time',
      reasoning: 'This album falls within the jazz pop genre, much like Bewitched, and likely features similar accessible vocal arrangements with a sophisticated jazz sensibility.',
      confidence: 0.8,
      feedback: null,
      createdAt: 2025-11-05T01:14:34.545Z
    }
  ]
}
Requesting.respond {
  request: '019a5194-6ee6-7ac4-9c62-4767b643d8ff',
  recommendations: [
    {
      _id: '019a5194-72b1-7f26-8ea9-1eba6e740a39',
      userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
      item1: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
      item2: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:all-this-time:1762305274545',
      itemName: 'All This Time',
      reasoning: 'This album falls within the jazz pop genre, much like Bewitched, and likely features similar accessible vocal arrangements with a sophisticated jazz sensibility.',
      confidence: 0.8,
      feedback: null,
      createdAt: 2025-11-05T01:14:34.545Z
    }
  ]
} => { request: '019a5194-6ee6-7ac4-9c62-4767b643d8ff' }
Recommendation.getRecommendations {
  userId: '019a2dd8-d972-7c32-8902-c381bdfa1976',
  item: '82c93285-46d7-4f44-ba7c-2c420cfc7665',
  amount: 1,
  feedbacked: false,
  ignore: [
    'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:the-manhattan-transfer---anthology--down-in-birdland:1762305253727',
    'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:rosie---rosie-solves-the-swingin--riddle:1762305253727'
  ]
} => {
  itemsWithReasoning: [
    {
      item: 'rec:019a2dd8-d972-7c32-8902-c381bdfa1976:all-this-time:1762305274545',
      itemName: 'All This Time',
      reasoning: 'This album falls within the jazz pop genre, much like Bewitched, and likely features similar accessible vocal arrangements with a sophisticated jazz sensibility.',
      confidence: 0.8
    }
  ]
}
Recommendation.getFeedbackHistory { userId: '019a2dd8-d972-7c32-8902-c381bdfa1976' } => {
  history: [
    {
      recommendationId: '019a5178-586a-7318-9e6d-f7d1e5f9f239',
      item: "Fall Out Boy - Sugar, We're Goin Down",
      feedback: true,
      reasoning: 'Shares the emo and pop punk genres, delivering anthemic choruses with a similar energetic punk edge.',
      sourceItem: '0d132658-6c53-4866-bf37-c25190b1fa24'
    },
    {
      recommendationId: '019a5178-586a-79da-9f36-e6f5abaf6a69',
      item: 'My Chemical Romance - Welcome to the Black Parade',
      feedback: true,
      reasoning: 'Both embody the emo and alternative rock spirit with dramatic song structures and powerful vocal performances.',
      sourceItem: '0d132658-6c53-4866-bf37-c25190b1fa24'
    },
    {
      recommendationId: '019a5178-586a-7b57-9365-845c2c070965',
      item: 'Green Day - American Idiot',
      feedback: true,
      reasoning: "Features a strong punk and alternative rock sound with socially conscious lyrics that resonate with the source item's genre profile.",
      sourceItem: '0d132658-6c53-4866-bf37-c25190b1fa24'
    },
    {
      recommendationId: '019a518a-0694-7838-85f8-1b5938446815',
      item: 'Fall Out Boy - Something to Believe In',
      feedback: false,
      reasoning: 'Shares the pop punk genre, offering energetic anthems with a similar punk edge and catchy vocal hooks.',
      sourceItem: '0d132658-6c53-4866-bf37-c25190b1fa24'
    },
    {
      recommendationId: '019a518a-0694-7e93-bcb1-73f3f98641b4',
      item: 'Fall Out Boy - October',
      feedback: false,
      reasoning: 'This track fits into the pop punk genre, delivering a high-energy sound with the driving guitars and vocal styles reminiscent of the source.',
      sourceItem: '0d132658-6c53-4866-bf37-c25190b1fa24'
    },
    {
      recommendationId: '019a518a-2652-75bb-a0e2-78dc67c08cc6',
      item: 'Fall Out Boy - Lucky',
      feedback: true,
      reasoning: 'Shares the pop punk genre with energetic vocal hooks and a driving rhythm section. It captures a similar youthful angst and catchy melodic sensibility.',
      sourceItem: '0d132658-6c53-4866-bf37-c25190b1fa24'
    },
    {
      recommendationId: '019a5194-215f-7aa4-8cd1-eff129df0104',
      item: 'Joe Williams - The Greatest!: Count Basie Plays, Joe Williams Sings Standards',
      feedback: true,
      reasoning: 'This album falls into the vocal jazz genre, offering powerful male vocals backed by a renowned big band, similar to the classic vocal jazz elements of Bewitched.',
      sourceItem: '82c93285-46d7-4f44-ba7c-2c420cfc7665'
    },
    {
      recommendationId: '019a5194-59c9-716a-8c44-6a142cf69cef',
      item: 'Various Artists - Softly',
      feedback: false,
      reasoning: 'This compilation delves into vocal jazz, showcasing smooth vocal performances over classic jazz arrangements, much like the intimate feel of Bewitched.',
      sourceItem: '82c93285-46d7-4f44-ba7c-2c420cfc7665'
    }
  ]
}
```