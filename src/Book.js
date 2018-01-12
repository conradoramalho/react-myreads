import React from "react";
import { Select } from 'rmwc/Select';
import PropTypes from "prop-types";

function Book(props) {
    const changeShelf = event => {
        const shelf = event.target.value;
        const book = props.book;

        props.updateShelf(book, shelf);
    }

    const book = props.book;
    const backgroundImage = book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/193x128';

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(', ')}</div>
            <div>
                <Select
                    onChange={changeShelf}
                    label="Estante"
                    value={book.shelf}
                    options={{ 'currentlyReading': 'Currently Reading', 'wantToRead': 'Want To Read', 'read': 'Read', 'none': 'None' }}
                />
            </div>
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default Book;
