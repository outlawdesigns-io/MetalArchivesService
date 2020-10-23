const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const app = express();

const maServer = require('./src/metalArchivesServer');
const config = require('./src/config');

/*Config*/
app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With','Content-Type','Accept');
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get('/artist/:artistStr/:artistId?',maServer.searchArtist);
app.get('/album/:albumStr/:artist?/:albumId?',maServer.searchAlbum);
app.get('/label/:label',maServer.searchLabel);
app.get('/song/:title',maServer.searchSong);
app.get('/lyrics/:songId',maServer.getLyrics);
app.get('/discography/:artistId',maServer.getDiscography);
app.get('/recommendation/:artistId',maServer.getRecommendations);
app.get('/roster/:labelId/:past?',maServer.getRoster);


if(config.DEBUG){
  app.listen(config.TESTPORT,()=>{
    console.log('Listening on port: ' + config.TESTPORT);
  });
}else{
  https.createServer({
    key: fs.readFileSync(config.SSLKEYPATH),
    cert: fs.readFileSync(config.SSLCERTPATH)
  },app).listen(config.LIVEPORT,()=>{
    console.log('Listening on port: ' + config.LIVEPORT);
  });
}
