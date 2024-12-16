const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require('cors')
const {v4: uuidv4} = require('uuid')
const databasePath = path.join(__dirname, 'BooksMangement.db')

const app = express()

app.use(express.json())
app.use(cors({origin: '*'}))

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () =>
      console.log('Server Running at http://localhost:3000/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

// POSTING BOOK DETAILS

app.post('/books', async (request, response) => {
  const {title, author, genre, pages, publishedDate} = request.body // Posting Book Details
  const id = uuidv4() //UUid Make Unique id
  try {
    const createStudentQuery = `
      INSERT INTO 
       Books(bookId,title, author, genre, pages, publishedDate) 
      VALUES 
        (
          '${id}',
          '${title}',
          '${author}',
          '${genre}',
           ${pages},
           ${publishedDate}
        )` //Insert Data to Database
    const dbResponse = await database.run(createStudentQuery)

    response.send('Succesfully submit your Book to Database ')
  } catch (error) {
    response.send('Error in submiting Book')
  }
})

// GETTING BOOK DETAILS  ALSO ADDED SEARCH FILTER

app.get('/books', async (request, response) => {
  const {author} = request.query // Extract the 'author' query parameter

  try {
    let getAllAssignment = 'SELECT * FROM Books'

    // If an author is provided, modify the query to filter by author
    if (author) {
      // Trim any extra spaces and handle case insensitivity
      getAllAssignment += ` WHERE LOWER(author) LIKE LOWER('%${author.trim()}%')`
    }

    // Running the query
    const dbResponse = await database.all(getAllAssignment)

    if (dbResponse.length === 0) {
      response.status(404).send('No books found for the author.')
    } else {
      response.send(dbResponse)
    }
  } catch (error) {
    response.status(500).send('Error fetching books')
  }
})

//GETTING BOOK BASED BOOKID 

app.get(
  '/books/:bookId',
  async (request, response) => {
    const {bookId} = request.params
    try {
      const getBooks = `SELECT * FROM Books  WHERE bookId = ${bookId}`
      const dbResponse = await database.all(getAllAssignment)
      response.send(dbResponse)
    } catch (error) {
      response.send(error)
    }
  },
)

// DELETING BOOK BASED ON BOOKID

app.delete('/books/:bookId', async (request, response) => {
  const {bookId} = request.params // Extract the bookId from the URL parameter

  try {
    const deleteBookQuery = `
      DELETE FROM Books WHERE bookId = '${bookId}'
    `

    const dbResponse = await database.run(deleteBookQuery)

    if (dbResponse.changes === 0) {
      return response.status(404).send('Book not found')
    }

    response.send('Book deleted successfully')
  } catch (error) {
    console.error('Error deleting book:', error)
    response.status(500).send('Error deleting book')
  }
})

// UPDATING BOOK DETAILS BASED ON BOOKID

app.put('/books/:bookId', async (request, response) => {
  const {bookId} = request.params // Extract the bookId from the URL parameter
  const {title, author, genre, pages, publishedDate} = request.body // Extract new data from request body

  try {
    // First, check if the book exists
    const checkBookExistsQuery = `SELECT * FROM Books WHERE bookId = '${bookId}'`
    const book = await database.get(checkBookExistsQuery)

    if (!book) {
      return response.status(404).send('Book not found')
    }

    // If book exists, update the book information
    const updateBookQuery = `
      UPDATE Books
      SET
        title = '${title || book.title}',  -- Only update if a value is provided
        author = '${author || book.author}',
        genre = '${genre || book.genre}',
        pages = ${pages || book.pages},
        publishedDate = ${publishedDate || book.publishedDate}
      WHERE bookId = '${bookId}'
    `

    const dbResponse = await database.run(updateBookQuery)

    response.send('Book updated successfully')
  } catch (error) {
    console.error('Error updating book:', error)
    response.status(500).send('Error updating book')
  }
})

module.exports = app
