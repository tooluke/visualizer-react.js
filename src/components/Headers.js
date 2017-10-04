import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Import Components
import SearchBar from './SearchBar';

// Import media
import logo from '../media/logo.svg';

class Headers extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render(){
    return (
      <div>
        <div className="topbar">
          <ul className="nav">
              <li><Link to="/">Home</Link></li>
              <li className="leftList"><SearchBar history={this.props.history} /></li>           
          </ul>
        </div>
        <div className="header">
          <Link to="/">
            <h1>
                Visualizer <span>on Reactjs</span>
                <img src={logo} alt="logo" />
            </h1>
          </Link>
        </div>
      </div>
    )
  }
}
export default Headers;