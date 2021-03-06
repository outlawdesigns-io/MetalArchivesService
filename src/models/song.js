"use strict";

const Record = require('../libs/record');

class Song extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'Song';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'track_number',
      'title',
      'playLength',
      'albumId'
    ];
  }
  static recordExists(id){
    return new Promise((resolve,reject)=>{
      let song = new Song();
      song.db.table(song.table).select(song.primaryKey).where(song.primaryKey + " = '" + id + "'").execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
  static search(title){
    let song = new Song();
    return song.db.table(song.table).select('*').where("title like '%" + title + "%'").execute()
  }
}

module.exports = Song;
