import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import Players from './Players';
import Games from './Games';
import Judges from './Judges';
import User from './User';
import Votes from './Votes';
import Dash from './Dash';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn : true,
        };
    };

    render() {
        let navLink = (
            <div className="Tab">
                <NavLink to='/games' activeClassName="activeLink" className="navLink">
                    Games
                </NavLink>
                <NavLink to='/judges' activeClassName="activeLink" className="navLink">
                    Judges
                </NavLink>
                <NavLink to='/players' activeClassName="activeLink" className="navLink">
                    Players
                </NavLink>
                <NavLink to='/votes' activeClassName="activeLink" className="navLink">
                    Votes
                </NavLink>
            </div>
        );

        const login  = this.state.isLoggedIn;

        return(
            <div className="App">
                {!login ? (
                    <div>
                        <Dash />
                        <h1>ok</h1>
                    </div>
                ):(
                    <Router>
                        <h1>ok</h1>
                        {navLink}
                        <Route exact path="/games" component={Games}></Route>
                        <Route exact path="/judges" component={Judges}></Route>
                        <Route exact path="/players" component={Players}></Route>
                        <Route exact path="/votes" component={Votes}></Route>
                    </Router>
                )}
            </div>
        )
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}