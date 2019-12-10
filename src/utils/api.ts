import { DBSchema, openDB } from 'idb';

import { Source } from '../store/sources/types';
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

class DBService {
  async init() {
    await openDB<ClientDatabase>('clientDatabase', 1, {
      upgrade(db: any) {
        db.createObjectStore('users', { keyPath: "id", autoIncrement: true });
        db.createObjectStore('sources', { keyPath: "id", autoIncrement: true });
      },
    });
  }

  async create(storageName: string, data: Object): Promise<number> {
    const db = await openDB('clientDatabase', 1);

    return await db.put(storageName, data) as number;
  }

  async delete(storageName: string, id: number): Promise<undefined> {
    const db = await openDB('clientDatabase', 1);

    return await db.delete(storageName, id);
  }

  async getAll(storageName: string): Promise<any[]> {
    const db = await openDB('clientDatabase', 1);

    const res = await db.getAll(storageName);

    // format as object with keys(ids) as object keys
    return res.reduce((items, item, index) => ({
      ...items,
      [item.id]: item
    }), {});
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

const db = new DBService();

export {
  getFeed,
  db
};
