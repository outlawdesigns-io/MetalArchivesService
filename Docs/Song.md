**Search Song**
----
  Returns a json array of songs related to your search query.

* **URL**

  /song/{song_title}

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `song_title=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    [
       {
          "title":"Reign in Blood",
          "artist":"Amethyste",
          "artistId":"8798",
          "album":"Live 2001",
          "albumId":"60527",
          "releaseType":"Demo"
       },
       {
          "title":"Reign in Blood",
          "artist":"Athanator",
          "artistId":"9962",
          "album":"Raise the Slaughter",
          "albumId":"22131",
          "releaseType":"Full-length"
       },
       {
          "title":"Reign in Blood",
          "artist":"Metal Illusion",
          "artistId":"41254",
          "album":"Hard to the Core",
          "albumId":"83752",
          "releaseType":"Demo"
       },...
    ]
    ```

* **Error Response:**

  * **Code:** 200 <br />
    **Content:** `{ error : "No Results" }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ error : "Unable to handle results" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/song/reign%20in%20blood",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
