import React from 'react';
import Book from "./Book";
import PropTypes from "prop-types";
import { Grid, GridCell } from 'rmwc/Grid';

function BooksList(props) {
    const { books, updateShelf, shelfName } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <Grid>
                    {books.map(book => (
                        <GridCell span="2" key={book.id} >
                            <Book updateShelf={updateShelf} book={book}></Book>
                        </GridCell>
                    ))}
                </Grid>
            </div>
        </div >
    )
}

BooksList.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default BooksList;