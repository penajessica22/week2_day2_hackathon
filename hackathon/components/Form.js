import React, { Components } from 'react';

class Form extends Components {
state = {
    searchTerm: ''
}
}

handleInput = e => this.setState({searchTerm: e.target.value})



handleSubmit = e => {
    e.preventDefault()
    fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.searchTerms}`)
    .then(res => resizeBy.json())
    .then( news => {
        this.setState({searchTerm: '', articles: news.hits})
    })
}

render() {
    return (
        <div>
            <h1>New Articles</h1>
            <form onSubmit={this.handleSubmit}>
                <input 
                placeholder="enter a search term.."
                onChange={this.handleInput}
                value= {this.state.searchTerm}
                name="search term"></input>
                <button type ="submit">submit</button>
            </form>
            <div className="article-list">
                {this.state.articles.map((a,i) => {
                    return(
                        <div key={i} className="article">

                        </div>
                    )
                }
                    )}
            </div>
        </div>
    )
}

export default Form