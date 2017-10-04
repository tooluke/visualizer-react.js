import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// Import Components
import CategoryGrid from '../components/CategoryGrid'; 
import ContentViewer from '../components/ContentViewer';
import Headers from '../components/Headers';
import Footer from '../components/Footer';

//History Object is necessary for manage browser url
//this allowed function as back and forward 
const history = createHistory();

const NoMatch = ({ location }) => (
  <div className="container noMatch">
    <h3>404 Error: page not found  <code>{location.pathname}</code> - <Link to="/"> Back Home</Link></h3>
  </div>
)

class Visualizer extends React.Component {

    static PropTypes = {
        category: PropTypes.string.isRequired
    }

    render() {
        return (
            <Router history={history} hashType="noslash" >
                <div>
                    <Headers history={history} />
                    <Switch>
                        <Route path="/" exact render={() => <CategoryGrid category={this.props.category}/>} />
                        <Redirect from="/wiki/:page" to="/:page" />
                        <Route path="/:page" exact render={({ match }) => 
                            <ContentViewer history={history} category={this.props.category} page={match.params.page}/>} />
                        <Redirect from="/?search=" to="/wiki/" />
                        <Route component={NoMatch}/>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default Visualizer