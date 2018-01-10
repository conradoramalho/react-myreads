import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Search from "./Search";
import ShelfBooks from './ShelfBooks';
import * as BooksAPI from './BooksAPI'
import './App.css';

class BooksApp extends Component {
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

        <Route exact path="/" render={() => <ShelfBooks booksInShelf={this.state.books} updateShelf={this.updateShelf} />} />
      </div>
    )
  }
}

export default BooksApp
