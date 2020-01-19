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
  static recordExists(title){}
}
