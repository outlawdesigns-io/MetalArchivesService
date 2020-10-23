**Get Discography**
----
  Returns a json array of albums associated with the given `artist_id`.

* **URL**

  /discography/{artist_id}/

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `artist_id=[int]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    [
       {
          "id":"18529",
          "title":"Serenades to the Tides of Blood",
          "year":"1998",
          "releaseType":"Demo"
       },
       {
          "id":"836317",
          "title":"The Future Is Rotten",
          "year":"1999",
          "releaseType":"Split"
       },
       {
          "id":"7218",
          "title":"The Eclipse of Ages into Black",
          "year":"2000",
          "releaseType":"Full-length"
       },
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
      url: "/discography/72",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
