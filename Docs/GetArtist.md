**Get Artist**
----
  Returns a json data about a signle artist.

* **URL**

  /artist/{artist}/{artist_id}

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `artist=[string]`
   `artist_id=[int]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
      "id":"72",
      "artist":"Slayer",
      "country":"United States",
      "city":"Huntington Park, Los Angeles County, California",
      "status":"Active",
      "formed":"1981",
      "genre":"Thrash Metal",
      "lyricalThemes":"Death, Satan, Anti-religion, Murder, War, Politics",
      "label":"Nuclear Blast"
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
      url: "/album/slayer/72",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
