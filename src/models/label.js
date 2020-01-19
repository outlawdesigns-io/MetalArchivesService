"use strict";

const Record = require('../libs/record');

class Label extends Record{

  constructor(id){
    const database = 'MetalArchives';
    const table = 'Label';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'name',
      'country',
      'phone',
      'status',
      'specialization',
      'founded',
      'onlineShopping',
      'website'
    ];
  }
  static recordExists(labelId){
    return new Promise((resolve,reject)=>{
      let label = new Label();
      label.db.table(label.table).select(label.primaryKey).where(label.primaryKey + ' = ' + labelId).execute().then((data)=>{
        if(!data.length){
          resolve(false);
        }
        resolve(true);
      }).catch(reject);
    });
  }
}

module.exports = Label;
