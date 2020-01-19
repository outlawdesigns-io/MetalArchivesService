const metalArchives = require('./src/metalArchivesModule');
const ArtistSearch = require('./src/models/artistSearch');
const Artist = require('./src/models/artist');


(async () => {
  let searchResults = await metalArchives.getLyrics(1945);
  console.log(searchResults);
  // searchResults.forEach(async (result)=>{
  //   let artistExists = await ArtistSearch.recordExists(result.id).catch(console.error);
  //   if(!artistExists){
  //     let artist = new ArtistSearch();
  //     let keys = Object.keys(result);
  //     keys.forEach((key)=>{
  //       artist[key] = result[key];
  //     });
  //     artist._create().then(console.log);
  //     // console.log(keys);
  //     //console.log(artist);
  //   }
  // });
})();



// metalArchives.searchArtist('slayer',72).then((results)=>{
//   console.log(results);
// }).catch((error)=>{
//   console.log('Error: ' + error);
// });
