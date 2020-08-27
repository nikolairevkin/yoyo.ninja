import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './App.css';
import Cookie from 'js-cookie';

import Players from './Player/Players';
import Games from './Game/Games';
import Judges from './Judge/Judges';
import Votes from './Vote/Votes';
import Dash from './Dash/Dash';
import LoginModal from './LoginModal';
import Home from './Home';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn : false,
            blank: '',
        }
        if(Cookie.get('remember')) this.state.isLoggedIn = true;
        else this.state.isLoggedIn = false;
    };

    handleLogin(name, password, remember) {
        console.log(name, password, remember);
        if(name == 'yoyo_ninja@gmail.com'){
            if(password == 'yoyo_ninja'){
                if(remember) Cookie.set('remember', true, {expires: 7});
                this.setState({isLoggedIn: true});
            } else {
                alert("Wrong Password!");
            }
        } else {
            alert("Invalid Email!");
        }
    }

    handleLogout() {
        this.setState({isLoggedIn: false});
    }

    render() {
        this.state.btnStyle = {
            display: 'inline-block',
            float: 'right',
        };

        let navLink = (
            <div className = "Tab">
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
            <div className="App" style={{marginTop:50}}>
                <LoginModal 
                    buttonLabel = {(login)?'Logout': 'Login'}
                    btnStyle = {this.state.btnStyle}
                    className = "login"
                    handleLogin = {(name, password, remember) => this.handleLogin(name, password, remember)}
                    handleLogout = {() => this.handleLogout()}
                />
                {!login ? (
                    <div>
                        <Dash />
                    </div>
                ):(
                    <Router>
                        {navLink}
                        <Route exact path="/games" component={Games}></Route>
                        <Route path="/judges" component={Judges}></Route>
                        <Route path="/players" component={Players}></Route>
                        <Route path="/votes" component={Votes}></Route>
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