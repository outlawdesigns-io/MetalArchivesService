"use strict";

//todo what do about songs?

const Record = require('../libs/record');

class Album extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'Album';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'artist',
      'releaseType',
      'releaseDate',
      'recordLabel'
    ];
  }
  static recordExists(albumId){
    return new Promise((resolve,reject)=>{
      let album = new Album();
      album.db.table(album.table).select(album.primaryKey).where(album.primaryKey + ' = ' + albumId).execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
}


module.exports = Album;
