# Books Mangement System 

Given two files `app.js` and a database file `BooksMangement.db` consisting of  one tables `books`.

Write APIs to perform operations on the tables `books`.

The columns of the tables are given below,


**Books  Table**

| Columns       | Type    |
| ------------- | ------- |
| bookId        | TEXT    |
| title         | TEXT    |
| author        | TEXT    |
| genre         | TEXT    |
| pages         | INTEGER |
| publishedDate | INTEGER |
| createdAt     |TIMESTAMP|

You can use your previous code if required.


### API 1

#### Path: `/books/`

#### Method: `POST`

**Request**

```
{
  "title": "christopher_phillips",
  "author": "christy@123",
  "genre: "sad",
   "pages":130,
   "publishedDate":1990
}
```

- **Scenario 1**

  - **Description**:

     If an Error submiting book to database

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Error in submiting Book
      ```

- **Scenario 2**

  - **Description**:

    Successful Book to database 

  - **Response**

      Succesfully submit your Book to Database 



### API 2

#### Path: `/books/`

#### Method: `GET`

#### Description:

Returns a books  based on the author name 

#### Response

```
{
   "bookId":"28b85b58yt5b_58b5b_58u5t7"
  "title": "Book Title",
  "author": "Book Author",
  "genre": "Book Genre",
  "pages": 300,
  "publishedDate": 2022
}
```



### API 3

#### Path: `/books/:booksId/`

#### Method: `DELETE`

#### Description:

Deletes a Book from the Books  table based on the book ID

#### Response

```
Book deleted successfully

```

### API 4 

### Path : `/books/:booksId/`

### Method :`PUT`

#### Description:

Updates a Book from the Books  table based on the book ID

#### Response

```
Book updated successfully

```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
