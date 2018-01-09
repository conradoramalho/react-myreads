import React from 'react';
import Book from "./Book";

class BooksList extends React.PureComponent {

    render() {
        const { books, updateShelf } = this.props;

        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book updateShelf={updateShelf} key={book.id} book={book}></Book>
                    ))}
                </ol>
            </div>
        )
    }
}

export default BooksList; 