**Get Lyrics**
----
  Returns lyrics of a specific song as plain text.

* **URL**

  /lyrics/{song_id}/

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `song_id=[int]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    Chronic fucking, chronic bud
    increased libido
    Engorging the flesh pipe
    smoke cum so green
    one spurt is not enough
    ...
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
      url: "/lyrics/1002677",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
