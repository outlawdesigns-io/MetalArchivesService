var mod =  (function(){
  const request = require('request');
  const host = 'https://metal-archives.com/';
  const artistPatterns = {
    artistId:/var\sbandId\s=\s([0-9]{1,20})/,
    artistName:/<h1 class="band_name"><a href=.*?>(.*?)<\/a>/,
    countryOfOrigin:/<dt>Country of origin:<\/dt>\n<dd><a href=.*?>(.*?)<\/a><\/dd>/,
    location:/<dt>Location:<\/dt>\n<dd>(.*?)<\/dd>/,
    status:/<dd class=".*?">(.*?)<\/dd>/,
    formedIn:/<dt>Formed in:<\/dt>\n<dd>(.*?)<\/dd>/,
    genre:/<dt>Genre:<\/dt>\n<dd>(.*?)<\/dd>/,
    lyricalThemes:/<dt>Lyrical themes:<\/dt>\n<dd>(.*?)<\/dd>/,
    recordLabel:/<dt>.*?label:<\/dt>\n<dd><a href=.*?>(.*?)<\/a><\/dd>/,
    recordLabel2:/<dt>.*?label:<\/dt>\n<dd>(.*?)<\/dd>/
  };
  const artistSearchPatterns = {
    artistId:/<a href=".*?\/([0-9]{1,20})/,
    artistName:/<a href=.*?>(.*?)\s\(/,
    genre:/<strong>(.*?)<\/strong>/,
    location:/<\/strong>\sfrom\s(.*)/
  };
  const albumPatterns = {
    tracks_global:/([0-9]{1,3})\.<\/td>\n<td\sclass="wrapWords.*?">\n(.*?)\n<\/td>/g,
    track_inLine:/([0-9]{1,3})\.<\/td>\n<td\sclass="wrapWords.*?">\n(.*?)\n<\/td>/,
    songId_global:/<tr id="song(.*?)"/g,
    songId_inLine:/<tr id="song(.*?)"/,
    trackLength_global:/<td align="right">([0-9]{2}:[0-9]{2})<\/td>/g,
    trackLength_inLine:/<td align="right">([0-9]{2}:[0-9]{2})<\/td>/,
    albumId:/var\sreleaseId\s=\s([0-9]{1,20})/,
    artist:/<h2\sclass="band_name">\n<a href=.*?>(.*?)<\/a>/,
    releaseType:/<dt>Type:<\/dt>\n\s?<dd>(.*?)<\/dd>/,
    releaseDate:/<dt>Release date:<\/dt>\n<dd>(.*?)<\/dd>/,
    recordLabel:/<dt>Label:<\/dt>\n<dd><a href=.*?>(.*?)<\/a><\/dd>/,
    independentLabel:/<dt>Label:<\/dt>\n<dd>(.*?)<\/dd>/
  };
  const albumSearchPatterns = {
    artist_album:/<a href=.*?>(.*?)<\/a>/,
    id:/\/([0-9]{1,10})/,
    releaseDate:/<!--\s([0-9]{4}-[0-9]{1,2}-[0-9]{1,2})\s-->/
  };
  const discogPatterns = {
    albumId_global:/<td><a\shref=".*?\/([0-9]{1,20})/g,
    albumId_inline:/<td><a\shref=".*?\/([0-9]{1,20})/,
    albumTitle_global:/<a\shref=.*?>(.*?)<\/a><\/td>/g,
    albumTitle_inline:/<a\shref=.*?>(.*?)<\/a><\/td>/,
    year_global:/<td\sclass=.*?>([0-9]{1,4})<\/td>/g,
    year_inline:/<td\sclass=.*?>([0-9]{1,4})<\/td>/,
    releaseType_global:/<td\sclass=.*?>([A-z]{1,10}.*?[A-z]{1,10})<\/td>/g,
    releaseType_inline:/<td\sclass=.*?>([A-z]{1,10}.*?[A-z]{1,10})<\/td>/

  };
  const recomPatterns = {
    artistId_global:/<tr\sid="recRow_([0-9]{1,20})">/g,
    artistId_inline:/<tr\sid="recRow_([0-9]{1,20})">/,
    artist_global:/<td><a\shref=.*?>(.*?)<\/a>/g,
    artist_inline:/<td><a\shref=.*?>(.*?)<\/a>/,
    country_global:/<tr id=.*?>\n<td>.*?<\/td>\n<td>(.*?)<\/td>/g,
    country_inline:/<tr id=.*?>\n<td>.*?<\/td>\n<td>(.*?)<\/td>/,
    genre_global:/<tr id=.*?>\n<td>.*?<\/td>\n<td>.*?<\/td>\n<td>(.*?)<\/td>/g,
    genre_inline:/<tr id=.*?>\n<td>.*?<\/td>\n<td>.*?<\/td>\n<td>(.*?)<\/td>/,
    similarityScore_global:/<td><span\sid=.*?>(.*?)\s<\/span><\/td>/g,
    similarityScore_inline:/<td><span\sid=.*?>(.*?)\s<\/span><\/td>/
  };
  const labelPatterns = {
    id:/javascript:popupReportDialog\([0-9]{1,3},\s([0-9]{1,20})/,
    name:/<h1 class="label_name">(.*?)<\/h1>/,
    address:/<dt>Address:<\/dt>\n<dd>(.*?)<br\s\/>\n(.*?)<br\s\/>\n(.*?)<\/dd>/,
    country:/<dt>Country:<\/dt>\n<dd><a href=.*?>(.*?)<\/a>/,
    phone:/<dt>Phone\snumber:<\/dt>\n<dd>(.*?)<\/dd>/,
    status:/<dt>Status:<\/dt>\n<dd><span class=.*?>(.*?)<\/span><\/dd>/,
    specialization:/<dt>Specialised in:<\/dt>\n<dd>(.*?)<\/dd>/,
    founded:/<dt>Founding\sdate\s:<\/dt>\n<dd>(.*?)<\/dd>/,
    onlineShopping:/<dt>Online\sshopping:<\/dt>\n<dd>(.*?)<\/dd>/,
    website:/<a\shref="(.*?)"\starget="_blank"\stitle="Go\sto\s.*?website/
  };
  const labelRosterPatterns = {
    artist:/<a href=.*?>(.*?)<\/a>/,
    id:/<a href='.*?([0-9]{1,20})'/
  };
  const labelOldRosterPatterns = {
    id:/<a href=".*?([0-9]{1,20})"/,
    artist:/<a\s.*?>(.*?)<\/a>/
  };
  const multipleResultPattern = /"\smay\srefer\sto:/;
  const tagPattern = /(<([^>]+)>)/ig;
  function _apiRequest(uri){
    return new Promise((resolve,reject)=>{
      let options = {
        url:host + '/' + uri,
      };
      request(options,(err,res,body)=>{
        if(!err && res.statusCode == 200){
          resolve(body);
        }else if(body['error']){
          reject(body.error);
        }else{
          reject(err);
        }
      });
    });
  }
  function _hasMultipleResults(htmlStr){
    if(!htmlStr.match(multipleResultPattern)){
      return false;
    }
    return true;
  }
  function _parseArtistResults(htmlStr){
    let data = htmlStr.toString().split("\n");
    let results = [];
    let artists = [];
    let ids = [];
    let genres = [];
    let locations = [];
    for(i in data){
      let matches;
      if((matches = data[i].match(artistSearchPatterns.artistName)) !== null){
        artists.push(matches[1]);
      }
      if((matches = data[i].match(artistSearchPatterns.artistId)) !== null){
        ids.push(matches[1]);
      }
      if((matches = data[i].match(artistSearchPatterns.genre)) !== null){
        genres.push(matches[1]);
      }
      if((matches = data[i].match(artistSearchPatterns.location)) !== null){
        locations.push(matches[1]);
      }
    }
    for(i in artists){
      results.push({id:ids[i],artist:artists[i],genre:genres[i],location:locations[i]});
    }
    return results;
  }
  function _parseArtistData(htmlStr){
    let results = {};
    results['id'] = htmlStr.match(artistPatterns.artistId)[1];
    results['artist'] = htmlStr.match(artistPatterns.artistName)[1];
    results['country'] = htmlStr.match(artistPatterns.countryOfOrigin)[1];
    results['city'] = htmlStr.match(artistPatterns.location)[1];
    results['status'] = htmlStr.match(artistPatterns.status)[1];
    results['formed'] = htmlStr.match(artistPatterns.formedIn)[1];
    results['genre'] = htmlStr.match(artistPatterns.genre)[1];
    results['lyricalThemes'] = htmlStr.match(artistPatterns.lyricalThemes)[1];
    if(htmlStr.match(artistPatterns.recordLabel) === null){
      results['label'] = htmlStr.match(artistPatterns.recordLabel2)[1];
    }else{
      results['label'] = htmlStr.match(artistPatterns.recordLabel)[1];
    }
    return results;
  }
  function _parseAlbumResults(searchResults){
    let results = [];
    for(i in searchResults.aaData){
      let result = {
        artist:searchResults.aaData[i][0].match(albumSearchPatterns.artist_album)[1],
        artistId:searchResults.aaData[i][0].match(albumSearchPatterns.id)[1],
        album:searchResults.aaData[i][1].match(albumSearchPatterns.artist_album)[1],
        albumId:searchResults.aaData[i][1].match(albumSearchPatterns.id)[1],
        releaseType:searchResults.aaData[i][2],
        releaseDate:searchResults.aaData[i][3].match(albumSearchPatterns.releaseDate)[1]
      };
      results.push(result);
    }
    return results;
  }
  function _parseAlbumData(htmlStr){
    let results = {};
    results['id'] = htmlStr.match(albumPatterns.albumId)[1];
    results['artist'] = htmlStr.match(albumPatterns.artist)[1];
    results['releaseType'] = htmlStr.match(albumPatterns.releaseType)[1];
    results['releaseDate'] = htmlStr.match(albumPatterns.releaseDate)[1];
    if(htmlStr.match(albumPatterns.recordLabel)){
      results['recordLabel'] = htmlStr.match(albumPatterns.recordLabel)[1];
    }else{
      results['recordLabel'] = htmlStr.match(albumPatterns.independentLabel)[1];
    }
    results['songs'] = _parseTracks(htmlStr);
    return results;
  }
  function _parseTracks(htmlStr){
    let tracks = [];
    let lines = htmlStr.match(albumPatterns.tracks_global);
    for(i in lines){
      let track = lines[i].match(albumPatterns.track_inLine);
      tracks.push({track_number:track[1],title:track[2]});
    }
    lines = htmlStr.match(albumPatterns.songId_global);
    for(i in lines){
      tracks[i].id = lines[i].match(albumPatterns.songId_inLine)[1];
    }
    lines = htmlStr.match(albumPatterns.trackLength_global);
    for(i in lines){
      tracks[i].playLength = lines[i].match(albumPatterns.trackLength_inLine)[1];
    }
    return tracks;
  }
  function _parseSongResults(searchResults){
    let results = [];
    for(i in searchResults.aaData){
      if(searchResults.aaData[i][0].match(albumSearchPatterns.artist_album) === null){
        continue;
      }
      let result = {
        title:searchResults.aaData[i][3],
        artist:searchResults.aaData[i][0].match(albumSearchPatterns.artist_album)[1],
        artistId:searchResults.aaData[i][0].match(albumSearchPatterns.id)[1],
        album:searchResults.aaData[i][1].match(albumSearchPatterns.artist_album)[1],
        albumId:searchResults.aaData[i][1].match(albumSearchPatterns.id)[1],
        releaseType:searchResults.aaData[i][2],
      }
      results.push(result);
    }
    return results;
  }
  function _parseDiscography(htmlStr){
    let results = [];
    let lines = htmlStr.match(discogPatterns.albumId_global);
    for(i in lines){
      results.push({id:lines[i].match(discogPatterns.albumId_inline)[1]});
    }
    lines = htmlStr.match(discogPatterns.albumTitle_global);
    for(i in lines){
      results[i].title = lines[i].match(discogPatterns.albumTitle_inline)[1];
    }
    lines = htmlStr.match(discogPatterns.year_global);
    for(i in lines){
      results[i].year = lines[i].match(discogPatterns.year_inline)[1];
    }
    lines = htmlStr.match(discogPatterns.releaseType_global);
    for(i in lines){
      results[i].releaseType = lines[i].match(discogPatterns.releaseType_inline)[1];
    }
    return results;
  }
  function _parseRecommendations(htmlStr){
    let results = [];
    let lines = htmlStr.match(recomPatterns.artistId_global);
    for(i in lines){
      results.push({id:lines[i].match(recomPatterns.artistId_inline)[1]});
    }
    lines = htmlStr.match(recomPatterns.artist_global);
    for(i in lines){
      results[i].artist = lines[i].match(recomPatterns.artist_inline)[1];
    }
    lines = htmlStr.match(recomPatterns.country_global);
    for(i in lines){
      results[i].country = lines[i].match(recomPatterns.country_inline)[1];
    }
    lines = htmlStr.match(recomPatterns.genre_global);
    for(i in lines){
      results[i].genre = lines[i].match(recomPatterns.genre_inline)[1];
    }
    lines = htmlStr.match(recomPatterns.similarityScore_global);
    for(i in lines){
      results[i].score = lines[i].match(recomPatterns.similarityScore_inline)[1];
    }
    return results;
  }
  function _parseLyrics(htmlStr){
    return htmlStr.replace(tagPattern,"").trim();
  }
  function _parseLabel(htmlStr){
    let result = {};
    let addressFields = htmlStr.match(labelPatterns.address);
    result['id'] = htmlStr.match(labelPatterns.id)[1];
    result['name'] = htmlStr.match(labelPatterns.name)[1];
    // result['address'] = addressFields[1] + addressFields[2] + addressFields[3];
    result['country'] = htmlStr.match(labelPatterns.country)[1];
    result['phone'] = htmlStr.match(labelPatterns.phone)[1].trim();
    result['status'] = htmlStr.match(labelPatterns.status)[1];
    result['specialization'] = htmlStr.match(labelPatterns.specialization)[1].trim();
    result['founded'] = htmlStr.match(labelPatterns.founded)[1].trim();
    result['onlineShopping'] = htmlStr.match(labelPatterns.onlineShopping)[1];
    result['website'] = htmlStr.match(labelPatterns.website)[1];
    return result;
  }
  function _parseLabelRoster(labelRoster,current){
    let results = [];
    let idPattern;
    let artistPattern;
    if(current){
      idPattern = labelRosterPatterns.id;
      artistPattern = labelRosterPatterns.artist;
    }else{
      idPattern = labelOldRosterPatterns.id;
      artistPattern = labelOldRosterPatterns.artist;
    }
    for(i in labelRoster.aaData){
      results.push({
        id:labelRoster.aaData[i][0].match(idPattern)[1],
        artist:labelRoster.aaData[i][0].match(artistPattern)[1],
        genre:labelRoster.aaData[i][1],
        country:labelRoster.aaData[i][2]
      });
    }
    return results;
  }
  return{
    searchArtist:function(artist,artistId){
      return new Promise((resolve,reject)=>{
        let uri = 'bands/' + artist;
        if(artistId !== undefined){
          uri += '/' + artistId;
        }
        _apiRequest(uri).then((htmlStr)=>{
          if(_hasMultipleResults(htmlStr)){
            resolve(_parseArtistResults(htmlStr));
          }else{
            resolve(_parseArtistData(htmlStr));
          }
        },reject).catch(reject);
      });
      return _apiRequest(artist);
    },
    searchAlbum:function(album,artist,albumId){
      return new Promise((resolve,reject)=>{
        let uri;
        let expectingJson = false;
        if(albumId !== undefined){
          uri = "albums/" + artist.replace(/\s/g,"_") + "/" + album.replace(/\s/g,"_") + "/" + albumId;
        }else if(artist !== undefined){
          uri = "albums/" + artist.replace(/\s/g,"_") + "/" + album.replace(/\s/g,"_");
        }else{
          uri = "search/ajax-album-search/?field=title&query=" + album.replace(/\s/g,"+");
          expectingJson = true;
        }
        _apiRequest(uri).then((htmlStr)=>{
          if(expectingJson){
            resolve(_parseAlbumResults(JSON.parse(htmlStr)));
          }else{
            resolve(_parseAlbumData(htmlStr));
          }
        },reject).catch(reject);
      });
    },
    searchSong:function(title){
      return new Promise((resolve,reject)=>{
        let uri = 'search/ajax-song-search/?field=title&query=' + title.replace(/\s/g,"+");
        _apiRequest(uri).then((htmlStr)=>{
          resolve(_parseSongResults(JSON.parse(htmlStr)));
        },(err)=>{
          reject(err);
        }).catch((err)=>{
          reject(err);
        });
      });
    },
    getDiscography:function(artistId){
      return new Promise((resolve,reject)=>{
        let uri = 'band/discography/id/' + artistId + '/tab/all';
        _apiRequest(uri).then((htmlStr)=>{
          resolve(_parseDiscography(htmlStr));
        },reject).catch(reject);
      });
    },
    getSimilarArtists:function(artistId){
      return new Promise((resolve,reject)=>{
        let uri = 'band/ajax-recommendations/id/' + artistId;
        _apiRequest(uri).then((htmlStr)=>{
          resolve(_parseRecommendations(htmlStr));
        },reject).catch(reject);
      });
    },
    getLyrics:function(songId){
      return new Promise((resolve,reject)=>{
        let uri = 'release/ajax-view-lyrics/id/' + songId;
        _apiRequest(uri).then((htmlStr)=>{
          resolve(_parseLyrics(htmlStr));
        },reject).catch(reject);
      });
    },
    searchLabel:function(label,labelId){
      return new Promise((resolve,reject)=>{
        let uri = 'labels/' + label.replace(/\s/g,'_');
        if(labelId !== undefined){
          uri += '/' + labelId;
        }
        _apiRequest(uri).then((htmlStr)=>{
          resolve(_parseLabel(htmlStr));
        },reject).catch(reject);
      });
    },
    getLabelRoster:function(labelId,current){
      return new Promise((resolve,reject)=>{
        let uri = 'label/';
        if(current){
          uri += 'ajax-bands/nbrPerPage/1000/id/' + labelId;
        }else{
          uri += 'ajax-bands-past/nbrPerPage/1000/id/' + labelId;
        }
        _apiRequest(uri).then((htmlStr)=>{
          resolve(_parseLabelRoster(JSON.parse(htmlStr.replace('"sEcho": ,','')),current));
        },reject).catch(reject);
      });
    }
  }
}());

module.exports = mod;
