import React from 'react';
import PropTypes from 'prop-types';

//Wikipedia has different page for upper and low case
function titleCase(str) {
  var words = str.toLowerCase()
                  .split(' ');

  for(var i = 0; i < words.length; i++) {
       var letters = words[i].split('');
       letters[0] = letters[0].toUpperCase();
       words[i] = letters.join('');
  }

  return words.join(' ');
}

//SearchBar component work with history browser
class SearchBar extends React.Component {
  static PropTypes = {
    history: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {searchValue: ''};

    // This binding is necessary to make `this` work in the callback
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //This function works to push browers history in the right position
  onSubmit(e) {
    var onSearch = titleCase(this.state.searchValue);
    this.props.history.push(`/${onSearch}`);
  }

  //This is usefull to know right page
  onChange(e) {
    e.preventDefault();
    this.setState({
      searchValue: document.getElementById("search").value
    });
  }

  render() {

    return (
      <form  onSubmit={this.onSubmit}>
        <input 
            id="search" 
            className="input" 
            name="search" 
            type="text" 
            placeholder="What're we looking for ?"  
            onChange={this.onChange} 
        />
        <input 
          id="search_submit"  
          className="input" 
          value="Rechercher" 
          type="submit" 
        />
    </form>
    );
  }
}

export default SearchBar;