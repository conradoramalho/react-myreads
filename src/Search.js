import React, { PureComponent } from "react";
import BooksList from "./BooksList";
import sortBy from 'sort-by';
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Debounce } from 'react-throttle';
import { If, Then, Else } from 'react-if';
import * as BooksAPI from './BooksAPI';

class Search extends PureComponent {
    state = {
        books: []
    };

    updateQuery = query => {

        if (query) {
            BooksAPI
                .search(query)
                .then(books => {

                    if (books.length) {
                        const myBooks = this.props.books;

                        const booksAux = books.map(book => {
                            const myBook = myBooks.find(myBook => myBook.id === book.id);

                            if (myBook)
                                book.shelf = myBook.shelf;

                            return book;
                        });

                        this.setState({ books: booksAux });

                    } else
                        this.setState({ books: [] });

                });
        } else
            this.setState({ books: [] });
    }

    render() {
        const { updateShelf } = this.props;
        const { books } = this.state;

        books.sort(sortBy('title'));

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input type="text" placeholder="Search by title or author" onChange={event => this.updateQuery(event.target.value)} />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    {
                        <If condition={books.length > 0}>
                            <Then>
                                <BooksList shelfName="Result" books={books} updateShelf={updateShelf}></BooksList>
                            </Then>
                            <Else>
                                <div>
                                    <p>No book found</p>
                                </div>
                            </Else>
                        </If>
                    }
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
};

export default Search;