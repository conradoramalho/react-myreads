import React, { PureComponent } from "react";
import { Select } from 'rmwc/Select';
import PropTypes from "prop-types";

class Book extends PureComponent {
    changeShelf = event => {
        const shelf = event.target.value;
        const bookId = this.props.book.id;

        this.props.updateShelf(bookId, shelf);
    }

    render() {
        const book = this.props.book;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
                <div>
                    <Select
                        onChange={this.changeShelf}
                        label="Estante"
                        value={book.shelf}
                        options={{ 'currentlyReading': 'Currently Reading', 'wantToRead': 'Want To Read', 'read': 'Read', 'none': 'None' }}
                    />
                </div>
            </div>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default Book;
