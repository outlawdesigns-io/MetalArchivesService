var mod = (function(){
  const metalArchives = require('./metalArchivesModule');
  const Album = require('./models/album');
  const AlbumSearch = require('./models/albumSearch');
  const Artist = require('./models/artist');
  const ArtistSearch = require('./models/artistSearch');
  const Label = require('./models/label');
  const Song = require('./models/song');
  const Lyrics = require('./models/lyrics');
  const SongSearch = require('./models/songSearch');
  const Recommendation = require('./models/Recommendation');

  const classMap = {
    Album:Album,
    AlbumSearch:AlbumSearch,
    Artist:Artist,
    ArtistSearch:ArtistSearch,
    Label:Label,
    Song:Song,
    SongSearch:SongSearch,
    Lyrics:Lyrics,
    Recommendation:Recommendation
  };

  async function _parseResults(results,modelLabel,primaryKeyLabel){
    if(results.length){
      results.forEach(async (result)=>{
        let modelExists = await classMap[modelLabel].recordExists(result[primaryKeyLabel]).catch(console.error);
        if(!modelExists){
          let model = new classMap[modelLabel];
          let keys = Object.keys(result);
          keys.forEach((key)=>{
            model[key] = result[key];
          });
          model = await model._create().catch(console.error);
        }
      });
    }else{
      let modelExists = await classMap[modelLabel].recordExists(results[primaryKeyLabel]).catch(console.error);
      if(!modelExists){
        let model = new classMap[modelLabel];
        let keys = Object.keys(results);
        keys.forEach((key)=>{
          model[key] = results[key];
        });
        model = await model._create().catch(console.error);
      }
      if(modelLabel == 'Album'){
        results.songs.forEach((song)=>{song.albumId = results[primaryKeyLabel]});
        _parseResults(results.songs,'Song','id');
      }
    }
  }

  return{
    searchArtist:function(req,res,next){
      /*
      does record exist?
      No->make MA request, save results, pass back to client
      yes->pass cached result back to client
      */
      metalArchives.searchArtist(req.params.artistStr,req.params.artistId).then(async(results)=>{
        let model = (results.length) ? 'ArtistSearch':'Artist';
        _parseResults(results,model,'id').catch(console.error);
        res.send(results);
      }).catch((error)=>{console.log(error);res.send({error:'No Results'});});
    },
    searchAlbum:function(req,res,next){
      metalArchives.searchAlbum(req.params.albumStr,req.params.artist,req.params.albumId).then(async(results)=>{
        let model = (results.length) ? 'AlbumSearch':'Album';
        let primaryKeyLabel = (results.length) ? 'albumId':'id';
        _parseResults(results,model,primaryKeyLabel);
        res.send(results);
      }).catch((error)=>{console.log(error);res.send({error:'No Results'});});
    },
    searchSong:function(req,res,next){
      metalArchives.searchSong(req.params.title).then((results)=>{res.send(results);}).catch((error)=>{res.send({error:'No Results'});});
    },
    getDiscography:function(req,res,next){
      metalArchives.getDiscography(req.params.artistId).then((results)=>{
        _parseResults(results,'AlbumSearch','id');
        res.send(results);
      }).catch((error)=>{res.send({error:'No Results'});});
    },
    getRecommendations:function(req,res,next){
      metalArchives.getSimilarArtists(req.params.artistId).then((results)=>{res.send(results);}).catch((error)=>{res.send({error:'No Results'});});
    },
    getLyrics:function(req,res,next){
      metalArchives.getLyrics(req.params.songId).then((results)=>{
        _parseResults({id:req.params.songId,body:results},'Lyrics','id');
        res.send(results);
      }).catch((error)=>{res.send({error:'No Results'});});
    },
    searchLabel:function(req,res,next){
      metalArchives.searchLabel(req.params.label).then(async(results)=>{
        _parseResults(results,'Label','id');
        res.send(results);
      }).catch((error)=>{res.send({error:'No Results'});});
    },
    getRoster:function(req,res,next){
      metalArchives.getLabelRoster(req.params.labelId,req.params.past).then((results)=>{res.send(results);}).catch((error)=>{res.send({error:'No Results'});});
    }
  }
}());

module.exports = mod;
