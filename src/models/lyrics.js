"use strict";

const Record = require('../libs/record');

class Lyrics extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'Lyrics';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'body'
    ];
  }
  static recordExists(id){
    return new Promise((resolve,reject)=>{
      let lyrics = new Lyrics();
      lyrics.db.table(lyrics.table).select(lyrics.primaryKey).where(lyrics.primaryKey + ' = ' + id).execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
}

module.exports = Lyrics;
