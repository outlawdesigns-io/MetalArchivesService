**Get Album**
----
  Returns json data about a single album.

* **URL**

  /album/{album title}/{artist name}/{album id}

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `album title=[string]`
   `artist name=[string]`
   `album id=[int]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
       "id":"108787",
       "artist":"Dissection",
       "releaseType":"Full-length",
       "releaseDate":"April 30th, 2006",
       "recordLabel":"Black Horizon Music",
       "songs":[
          {
             "track_number":"1",
             "title":"Nexion 218",
             "id":"787011",
             "playLength":"01:32"
          },
          {
             "track_number":"2",
             "title":"Beyond the Horizon",
             "id":"787012",
             "playLength":"05:20"
          },
          {
             "track_number":"3",
             "title":"Starless Aeon",
             "id":"787013",
             "playLength":"03:59"
          },
          {
             "track_number":"4",
             "title":"Black Dragon",
             "id":"787014",
             "playLength":"04:48"
          },
          {
             "track_number":"5",
             "title":"Dark Mother Divine",
             "id":"787015",
             "playLength":"05:44"
          },
          {
             "track_number":"6",
             "title":"Xeper-i-Set",
             "id":"787016",
             "playLength":"03:08"
          },
          {
             "track_number":"7",
             "title":"Chaosophia",
             "id":"787017",
             "playLength":"00:41"
          },
          {
             "track_number":"8",
             "title":"God of Forbidden Light",
             "id":"787018",
             "playLength":"03:42"
          },
          {
             "track_number":"9",
             "title":"Reinkaos",
             "id":"787019",
             "playLength":"04:43"
          },
          {
             "track_number":"10",
             "title":"Internal Fire",
             "id":"787020",
             "playLength":"03:20"
          },
          {
             "track_number":"11",
             "title":"Maha Kali",
             "id":"787021",
             "playLength":"06:04"
          }
       ]
    }
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
      url: "/album/Reinkaos/dissection/108787",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
