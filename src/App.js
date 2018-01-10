import React from 'react';
import Search from "./Search";
import BooksList from "./BooksList";
import * as BooksAPI from './BooksAPI'
import { Route, Link } from "react-router-dom";
import './App.css';

class BooksApp extends React.Component {
  allBooks = [];

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => {
        console.log('books: ', books);
        this.allBooks = books;

        this.setState({
          books: {
            currentlyReading: this.allBooks.filter(book => book.shelf === 'currentlyReading'),
            wantToRead: this.allBooks.filter(book => book.shelf === 'wantToRead'),
            read: this.allBooks.filter(book => book.shelf === 'read')
          }
        })
      })
  }

  updateShelf = (bookId, shelf) => {
    const book = this.allBooks.find(book => book.id === bookId);

    BooksAPI
      .update(book, shelf)
      .then(shelfs => {

        this.setState({
          books: {
            currentlyReading: this.allBooks.filter(book => shelfs.currentlyReading.find(bookId => book.id === bookId)),
            wantToRead: this.allBooks.filter(book => shelfs.wantToRead.find(bookId => book.id === bookId)),
            read: this.allBooks.filter(book => shelfs.read.find(bookId => book.id === bookId))
          }
        });

      }, () => { });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => <Search books={this.allBooks} updateShelf={this.updateShelf} />} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              {
                this.state.books.currentlyReading.length > 0 ? (
                  <BooksList shelfName="Currently Reading" updateShelf={this.updateShelf} books={this.state.books.currentlyReading}></BooksList>
                ) : (
                    <div>
                      <p>There aren't books in this shelf</p>
                    </div>
                  )

              }
              {
                this.state.books.currentlyReading.length > 0 ? (

                  <BooksList shelfName="Want to Read" updateShelf={this.updateShelf} books={this.state.books.wantToRead}></BooksList>
                ) : (
                    <div>
                      <p>There aren't books in this shelf</p>
                    </div>
                  )
              }
              {
                this.state.books.read.length > 0 ? (
                  <BooksList shelfName="Read" updateShelf={this.updateShelf} books={this.state.books.read}></BooksList>
                ) : (
                    <div>
                      <p>There aren't books in this shelf</p>
                    </div>
                  )
              }
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
