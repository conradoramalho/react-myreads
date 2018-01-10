import React, { PureComponent } from "react";
import BooksList from "./BooksList";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

class Search extends PureComponent {
    state = {
        query: ''
    };

    updateQuery = query => {
        this.setState({ query: query.trim() })
    }

    render() {
        const { books, updateShelf } = this.props;
        const query = this.state.query;

        let showingBooks;

        if (query) {

            const match = new RegExp(escapeRegExp(query), 'i');
            showingBooks = books.filter(book => (match.test(book.title) || match.test(book.authors)));

        } else
            showingBooks = books;

        showingBooks.sort(sortBy('title'));

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={event => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksList shelfName="Result" books={showingBooks} updateShelf={updateShelf}></BooksList>
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