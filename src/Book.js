import React, { Component } from "react";
import { Select } from 'rmwc/Select';

class Book extends Component {
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
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                </div>
                <div>
                    <Select
                        onChange={this.changeShelf}
                        label="Estante"
                        options={{ 'currentlyReading': 'Currently Reading', 'wantToRead': 'Want To Read', 'read': 'Read', 'none': 'None' }}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book;
