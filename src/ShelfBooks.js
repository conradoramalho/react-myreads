import React from "react";
import BooksList from "./BooksList";
import PropTypes from "prop-types";
import { If, Then } from 'react-if';
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
                <If condition={currentlyReading.length > 0}>
                    <Then>
                        <BooksList shelfName="Currently Reading" updateShelf={updateShelf} books={currentlyReading}></BooksList>
                    </Then>
                </If>
                <If condition={wantToRead.length > 0}>
                    <Then>
                        <BooksList shelfName="Want to Read" updateShelf={updateShelf} books={wantToRead}></BooksList>
                    </Then>
                </If>

                <If condition={read.length > 0}>
                    <Then>
                        <BooksList shelfName="Read" updateShelf={updateShelf} books={read}></BooksList>
                    </Then>
                </If>
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