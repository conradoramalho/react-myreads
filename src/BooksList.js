import React, { Component } from 'react';
import Book from "./Book";
import { Grid, GridCell } from 'rmwc/Grid';

class BooksList extends Component {

    render() {
        const { books, updateShelf, shelfName } = this.props;

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
}

export default BooksList;



