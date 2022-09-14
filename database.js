import { openDB } from 'idb';

export const database = openDB('movie-app', 1, {
  upgrade(db) {
    db.createObjectStore('movies', { keyPath: 'imdbID' });
    db.createObjectStore('settings');
    db.createObjectStore('notes', { keyPath: 'imdbID' });
  },
});