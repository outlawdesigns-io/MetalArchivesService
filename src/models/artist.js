"use strict";

const Record = require('../libs/record');

class Artist extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'Artist';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'artist',
      'country',
      'city',
      'status',
      'formed',
      'genre',
      'lyricalThemes',
      'label'
    ];
  }
  static recordExists(artistId){
    return new Promise((resolve,reject)=>{
      let artist = new Artist();
      artist.db.table(artist.table).select(artist.primaryKey).where(artist.primaryKey + ' = ' + artistId).execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
}

module.exports = Artist;
