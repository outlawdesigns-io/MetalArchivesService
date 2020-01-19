"use strict";

const Record = require('../libs/record');

class ArtistSearch extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'ArtistSearch';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'artist',
      'genre',
      'location',
    ];
  }
  static recordExists(artistId){
    return new Promise((resolve,reject)=>{
      let artist = new ArtistSearch();
      artist.db.table(artist.table).select(artist.primaryKey).where(artist.primaryKey + ' = ' + artistId).execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
}

module.exports = ArtistSearch;
