**Search Artist**
----
  Returns a json array of artists related to your search query.

* **URL**

  /artist/{artist}

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `artist=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    [
       {
          "id":"72",
          "artist":"Slayer",
          "genre":"Thrash Metal",
          "location":"Huntington Park, Los Angeles County, California, United States"
       },
       {
          "id":"7315",
          "artist":"Slayer",
          "genre":"NWOBHM",
          "location":"Rochdale, Greater Manchester, England, United Kingdom"
       },
       {
          "id":"3540412124",
          "artist":"Slayer",
          "genre":"Heavy Metal",
          "location":"Tokyo, Japan"
       }
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
      url: "/album/slayer",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
