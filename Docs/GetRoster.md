**Get Label Roster**
----
  Returns a json array of artists associated with the given `label_id`.

* **URL**

  /roster/{lable_id}/{past}?

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `label_id=[int]`

   **Optional**
   
   `past=[bool]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    [
       {
          "id":"5058",
          "artist":"All Shall Perish",
          "genre":"Deathcore",
          "country":"United States"
       },
       {
          "id":"87289",
          "artist":"Amentia",
          "genre":"Technical Brutal Death Metal",
          "country":"Belarus"
       },
       {
          "id":"110181",
          "artist":"Awaiting the Autopsy",
          "genre":"Slam/Brutal Death Metal/Deathcore",
          "country":"Germany"
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
      url: "/roster/311",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
