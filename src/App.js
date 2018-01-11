import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Search from "./Search";
import ShelfBooks from './ShelfBooks';
import * as BooksAPI from './BooksAPI'
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => {

        this.setState({ books });

      })
  }

  updateShelf = (book, shelf) => {
    const books = this.state.books;

    BooksAPI
      .update(book, shelf)
      .then(shelfs => {
        book.shelf = shelf;

        if (books.indexOf(book) === -1)
          books.push(book);

        const currentlyReading = books.filter(book => shelfs.currentlyReading.find(bookId => bookId === book.id));
        const read = books.filter(book => shelfs.read.find(bookId => bookId === book.id));
        const wantToRead = books.filter(book => shelfs.wantToRead.find(bookId => bookId === book.id));

        this.setState({
          books: [...currentlyReading, ...read, ...wantToRead]
        });

      }, () => { });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => <Search books={this.state.books} updateShelf={this.updateShelf} />} />

        <Route exact path="/" render={() => <ShelfBooks books={this.state.books} updateShelf={this.updateShelf} />} />
      </div>
    )
  }
}

export default BooksApp
