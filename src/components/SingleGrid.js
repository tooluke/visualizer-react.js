import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Link } from 'react-router-dom'

// Import media - using this media where not find wiki image
import defaultImg from '../media/default.jpg';

class SingleGrid extends React.Component {
    static PropTypes = {
        pageid: PropTypes.string.isRequired
    }

    state = {
        posts: [],
        loading: true,
        error: null
    }

  componentDidMount() {
    Axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=${this.props.pageid}&origin=*&prop=pageimages&pithumbsize=250`)
      .then(res => {
        // Transform the raw data by extracting the nested posts
        const posts = res.data['query']['pages'][this.props.pageid];

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
      });

  }
    
  renderLoading() {
      return <div>Loading...</div>;
  }

  renderError() {
      return (
          <div>
              Something went wrong: {this.state.error.message}
          </div>
      );
  }

  renderSingleGrid() {
  // Using destructuring to extract the 'error' and 'posts'
    const { error, posts } = this.state;
    const link = posts.title.replace(/ /g, '_');

    if(error) {
      return (
        <div className="singlePost">
          <Link to={`/${posts.title}`}>
            <img src={defaultImg} alt={posts.title} /><br/>
            <h2>{posts.title}</h2>
          </Link>
        </div>
      )
    }

    return (
      <div className="singlePost">
        <Link to={`/${link}`}>
          <img src={posts.thumbnail.source} alt={posts.title} /><br/>
          <h2>{posts.title}</h2>
        </Link>
      </div>
    )
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        {loading ? this.renderLoading() : this.renderSingleGrid()}
      </div>
    );
  }
}

export default SingleGrid;
