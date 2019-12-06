import { DBSchema, openDB } from 'idb';

import { Source } from './store/sources/types';
const Parser = require('rss-parser');

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface ClientDatabase extends DBSchema {
  users: {
    key: number,
    value: User;
  },
  sources: {
    key: number,
    value: Source;
  }
}

async function getFeed(feedUrl: any) {
  const parser = new Parser({
    customFields: {
      item: [['enclosure', { keepArray: true }]]
    },
  });

  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  // const CORS_PROXY = 'https://crossorigin.me/';

  if (feedUrl) {
    try {
      return await parser.parseURL(CORS_PROXY + feedUrl);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  return null;
}

const init = async () => {
  await openDB<ClientDatabase>('clientDatabase', 1, {
    upgrade(db: any) {
      db.createObjectStore('users', { autoIncrement: true });
      db.createObjectStore('sources', { autoIncrement: true });
    },
  });
};

export default {
  getFeed,
  init
};
