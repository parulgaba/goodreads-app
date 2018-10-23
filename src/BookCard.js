import React, { Component } from "react";

import "./index.css";

class BookCard extends Component {
  constructor() {
    super();
    this.state = {
      isCollapsed: true
    };
  }

  handleOnClick = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  render() {
    const { book } = this.props;
    const { isCollapsed } = this.state;

    return (
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img src={book.image_url} alt={book.title} />
            <span className="card-title">{book.title}</span>
          </div>
          <div className="card-content">
            <p>{book.description.replace(/<(?:.|\n)*?>/gm, "")}</p>
          </div>
          <div className="card-action">
            <a href={book.url} target="_blank">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
