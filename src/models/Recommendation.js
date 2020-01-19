"use strict";

const Record = require('../libs/record');

class Recommendation extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'ArtistSearch';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'artist',
      'genre',
      'country',
      'score'
    ];
  }
  static recordExists(recomId){
    return new Promise((resolve,reject)=>{
      let recom = new Recommendation();
      recom.db.table(recom.table).select(recom.primaryKey).where(recom.primaryKey + ' = ' + recomId).execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
}

module.exports = Recommendation;
