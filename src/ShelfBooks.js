import React from "react";
import BooksList from "./BooksList";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ShelfBook(props) {
    const updateShelf = props.updateShelf;

    const currentlyReading = props.books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = props.books.filter(book => book.shelf === 'wantToRead');
    const read = props.books.filter(book => book.shelf === 'read');

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
                {
                    (
                        currentlyReading.length > 0 &&
                        <BooksList shelfName="Currently Reading" updateShelf={updateShelf} books={currentlyReading}></BooksList>
                    )
                }
                {
                    (
                        wantToRead.length > 0 &&

                        <BooksList shelfName="Want to Read" updateShelf={updateShelf} books={wantToRead}></BooksList>
                    )
                }
                {
                    (
                        read.length > 0 &&
                        <BooksList shelfName="Read" updateShelf={updateShelf} books={read}></BooksList>
                    )
                }
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

ShelfBook.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default ShelfBook;