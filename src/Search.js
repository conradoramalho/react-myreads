import React, { PureComponent } from "react";
import BooksList from "./BooksList";
import sortBy from 'sort-by';
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
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

                    if (books.length)
                        this.setState({ books });
                    else
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
                        <input type="text" placeholder="Search by title or author" onChange={event => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {
                        books.length > 0 ? (

                            <BooksList shelfName="Result" books={books} updateShelf={updateShelf}></BooksList>
                        ) : (<div><p>No book found</p></div>)
                    }
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    updateShelf: PropTypes.func.isRequired
};

export default Search;