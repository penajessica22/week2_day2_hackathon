import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      articles: [],
      searchAuthor: ""
    };
  }
  handleInput = e => this.setState({ searchTerm: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.searchTerm}`)
      .then(res => res.json())
      .then(news => {
        console.log(news.hits);
        this.setState({ searchTerm: "", articles: news.hits });
      });
  };

  handleInputAuthor = e => this.setState({ searchAuthor: e.target.value });

  handleSubmitByAuthor = e => {
    e.preventDefault();
    fetch(
      `http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.searchAuthor}`
    )
      .then(res => res.json())
      .then(news => {
        console.log(news.hits, "author");
        this.setState({ searchAuthor: "", articles: news.hits });
      });
  };

  render() {
    return (
      <div>
        <h1>New Articles</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="enter a search term.."
            onChange={this.handleInput}
            value={this.state.searchTerm}
            name="search term"
          ></input>
          <button type="submit">submit</button>
        </form>
        <form onSubmit={this.handleSubmitByAuthor}>
          <input
            placeholder="enter a Author Name.."
            onChange={this.handleInputAuthor}
            value={this.state.searchAuthor}
            name="search term"
          ></input>
          <button type="submit">submit</button>
        </form>
        <div className="article-list">
          {this.state.articles.map((a, i) => {
            return (
              <div key={i} className="article">
                {a.title} {a.author}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Form;
