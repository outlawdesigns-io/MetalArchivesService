
# Metal Archives REST API

## Preamble

The Metal Archives service provides programmatic access to [Metal Archives](https://www.metal-archives.com/) since they do not provide their own API.

## Meta

### Security

This API is freely accessible with no rate limits.

#### Sample Call
```
curl https://api.outlawdesigns.io:8690/artist/slayer/72
```

### Reporting performance or availability problems

Report performance/availability at our [support site](mailto:j.watson@outlawdesigns.io).

### Reporting bugs, requesting features

Please report bugs with the API or the documentation on our [issue tracker](https://github.com/outlawdesigns-io/MetalArchivesService/issues).

## Endpoints

### artist/

Returns either a single JSON encoded object or an array of JSON encoded objects existing within the `LOE\Music` namespace.
* [SearchArtist](./Docs/SearchArtist.md)
* [GetArtist](./Docs/GetArtist.md)

### album/

* [SearchAlbum](./Docs/SearchAlbum.md)
* [GetAlbum](./Docs/GetAlbum.md)

### label/

* [SearchLabel](./Docs/SearchLabel.md)

### song/

* [SearchSong](./Docs/Song.md)

### lyrics/

* [GetLyrics](./Docs/GetLyrics.md)

### discography/

* [GetDiscography](./Docs/GetDiscography.md)

### recommendation/

* [GetRecommendations](./Docs/GetRecommendations.md)

### roster/

* [GetRoster](./Docs/GetRoster.md)
