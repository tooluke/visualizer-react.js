import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import component - This component need to render CrossRef info
import CrossRefViewer from './CrossRefViewer'

// Import media
import loadingGif from '../media/loadAnimated.gif';

class ContentViewer extends React.Component {
  static PropTypes = {
    page: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  }
 
  state = {
      page: this.props.page,
      posts: [],
      isCategory: false,
      loading: true,
      error: null
  } 

  componentDidMount() {
    console.log(this.state.page);
    //The first API call is to find if this post isCategory or not - component's loading yet
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${this.state.page}&prop=categories&cllimit=500&format=json&formatversion=2&clcategories=Category:${this.props.category}&origin=*`)
    .then(res => {
      // If it is defined the topic'll in category
      if(res.data['query']['pages']['0']['categories']){
        this.setState({
          isCategory: true
        })
      }
    })
    .catch(err => { console.log(err) });

    //Second one is to get wiki info
    axios.get(`https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${this.state.page}&disableeditsection=1&disabletoc=1&origin=*&redirects`)
      .then(res => {
        // Transform the raw data by extracting the nested posts
        const posts = res.data['parse'];

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
    });
  }

  renderLoading() {
    return <div className="container" ><img className="loading" alt="LoadingGif" src={loadingGif} /></div>;
  }

  renderError() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  renderPosts() {
    // Using destructuring to extract the 'error', 'posts' and 'isCategory'
    const { error, posts, isCategory } = this.state;

    if(error) {
      return this.renderError();
    }

    if( !this.state.posts ) {
      return (
        <div className="container noMatch">
          <h1>{this.state.page}</h1>
          <h3>404 Error: page not found /  <code>{this.state.page}</code> 
          <Link to="/"> Back Home</Link></h3>
         </div>
      )
    } else {

      var text  = this.state.posts['text']['*']
                                .replace(/&#160;|style=""/g, ' ')
                                .replace(/href="\/\wiki/g, 'href="');
 
      if(isCategory) {
        return (
          <div className="container">
            <h1>{posts.title}</h1>
            <div className="crossViewer"> 
                <CrossRefViewer page={posts.title} /> 
            </div>
            <div 
              className="wikiViewer"
              dangerouslySetInnerHTML={{__html: text}}
            ></div>
          </div>
        )
      } else {
        return (
          <div className="container">
            <h1>{posts.title}</h1>
            <div 
              className="wikiViewer"
              dangerouslySetInnerHTML={{__html: text}}
              ></div>
          </div>
        );
      }
    }
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

export default ContentViewer ;
