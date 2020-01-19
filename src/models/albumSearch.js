"use strict";

const Record = require('../libs/record');

class AlbumSearch extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'AlbumSearch';
    const primaryKey = 'albumId';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'artist',
      'artistId',
      'album',
      'albumId',
      'releaseType',
      'releaseDate'
    ];
  }
  static recordExists(albumId){
    return new Promise((resolve,reject)=>{
      let album = new AlbumSearch();
      album.db.table(album.table).select(album.primaryKey).where(album.primaryKey + ' = ' + albumId).execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
}

module.exports = AlbumSearch;
