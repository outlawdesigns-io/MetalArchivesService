"use strict";

const Record = require('../libs/record');

class SongSearch extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'SongSearch';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'title',
      'artist',
      'artistId',
      'album',
      'albumId',
      'releaseType'
    ];
  }
  static recordExists(title){
    return new Promise((resolve,reject)=>{
      let song = new SongSearch();
      song.db.table(song.table).select(song.primaryKey).where("title = '" + title + "'").execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
}

module.exports = SongSearch;
