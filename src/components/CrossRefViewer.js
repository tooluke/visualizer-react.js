import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

class CrossRefViewer extends React.Component {
  static PropTypes = {
    page: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }

  state = {
    posts: [],
    loading: true,
    error: null
  } 

  componentDidMount() {
        
    // Get CrossRef info
    axios.get(`https://api.crossref.org/works?query.title=${this.props.page}&sort=relevance&order=desc&rows=600`)
    .then(res => {
      // Transform the raw data by extracting the nested posts
      const posts = res.data.message.items.filter( obj => {
          return obj['title']['0'].search(this.props.page) > 0
        });
      // Update state to trigger a re-render.
      // Clear any errors, and turn off the loading indiciator.
      this.setState({
        posts,
        loading: false,
        error: null
      });
    })
    .catch(err => {
      // Something went wrong. Save the error in state and re-render.
      this.setState({
        loading: false,
        error: err
      });
    })
  }

  renderLoading() {
    return <div>CrossRef loading ... </div>;
  }

  renderError() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  renderPosts() {
    // Using destructuring to extract the 'error' and 'posts'
    // keys from state. This saves having to write "this.state.X" everwhere.
    const { error, posts } = this.state;

    if(error) {
      return this.renderError();
    }
    if (posts.length !== 0) {
      return (
        <div> 
          <h3> CrossRef Says </h3>
          <ul>
            {posts.map(obj => {
              return (
                <li key={obj.DOI}> 
                  <a href={obj.URL} target="_blank"> { ReactHtmlParser(obj['title']['0']) } </a> 
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
    else return <h3> Nothing found on crossref </h3>
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        {loading ? this.renderLoading() : this.renderPosts()}
      </div>
    );
  }
}

export default CrossRefViewer;