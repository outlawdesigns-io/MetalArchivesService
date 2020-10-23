**Search Album**
----
  Returns a json array of albums related to your search query.

* **URL**

  /album/{album title}

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `album title=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    [
     {
        "artist":"Eaten",
        "artistId":"3540377347",
        "album":"Eaten",
        "albumId":"669465",
        "releaseType":"Full-length",
        "releaseDate":"2017-06-23"
     },
     {
        "artist":"Demon Pact",
        "artistId":"7709",
        "album":"Eaten Alive",
        "albumId":"17036",
        "releaseType":"Single",
        "releaseDate":"1981-00-00"
     },
     {
        "artist":"Diabolical Hate",
        "artistId":"3540365091",
        "album":"Flesh Eaten",
        "albumId":"377528",
        "releaseType":"Demo",
        "releaseDate":"2010-00-00"
     }
   ...
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
      url: "/album/eaten",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
