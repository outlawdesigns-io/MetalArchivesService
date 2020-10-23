**Get Recommendations**
----
  Returns a json array of artist recommendations associated with the given `artist_id`.

* **URL**

  /recommendation/{artist_id}/

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
          "id":"157",
          "artist":"Kreator",
          "country":"Germany",
          "genre":"Thrash Metal",
          "score":"366"
       },
       {
          "id":"419",
          "artist":"Sodom",
          "country":"Germany",
          "genre":"Black/Speed Metal (early); Thrash Metal (later)",
          "score":"322"
       },
       {
          "id":"126",
          "artist":"Dark Angel",
          "country":"United States",
          "genre":"Thrash Metal",
          "score":"292"
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
      url: "/recommendation/72",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
