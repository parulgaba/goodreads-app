import React, { Component } from "react";
import goodreads from "goodreads-api-node";

import BookCard from "./BookCard";

const myCredentials = {
  key: "201CPDQDf1FN9qHnOPA",
  secret: "btKRtRJASD3jcRh4BWzAEu0A7PrX4p6VQLZNe5uxk"
};

const gr = goodreads(myCredentials);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      books: [],
      searchText: ""
    };
  }

  componentDidMount() {
    gr.getBooksByAuthor("175417")
      .then(author => {
        this.setState({
          books: author.books.book,
          isLoading: false
        });
      })
      .catch(error => console.log(error));
  }

  applySearchFilter = (books, searchText) => {
    return books.filter(({ title }) => title.includes(searchText));
  };

  handleSearchTextChange = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  renderSearchBox = () => {
    return (
      <div className="col s4 m7">
        <input
          onChange={this.handleSearchTextChange}
          placeholder="Search Books"
          type="text"
        />
      </div>
    );
  };

  render() {
    const { books, searchText } = this.state;
    let filteredBooks = [];
    if (searchText) {
      filteredBooks = this.applySearchFilter(books, searchText);
    } else {
      filteredBooks = books;
    }

    return (
      <div>
        <div>{this.renderSearchBox()}</div>
        <div className="row">
          {filteredBooks.length ? (
            filteredBooks.map((book, index) => {
              return (
                <div key={index}>
                  <BookCard book={book} />
                </div>
              );
            })
          ) : (
            <div className="row card-panel">No Search Results</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
