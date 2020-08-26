import React, { Component } from 'react';
import axios from 'axios';
import {Input, FormGroup, Label, Col, Row, Table, Form} from 'reactstrap';
import Constants from './../Constants';

class Dash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                games: [],
                judges: [],
                players: [],
                selectedGame: '',
                selectedPlayer: '',
            },
            game: '',
            player: '',
            top: '',
            isLoading: true,
            responseStatus: true,
        };
    }

    componentDidMount() {
        console.log("Mount OK");
        axios
            .get(Constants.APP_URL+'/api/home')
            .then((response) => {
                this.setState({ isLoading: false });
                if (response.data.status === 200) {
                    console.log(response.data);
                    this.setState({
                        data: response.data.data,
                        game: response.data.data.selectedGame,
                        player: response.data.data.selectedPlayer,
                        top: 5,
                        responseStatus: true,
                    });
                } else {
                    this.setState({
                        responseStatus: false,
                    });
                }
            })
    }

    onGameSelectChange(e) {
        var game = e.target.value;
        console.log(game);
        for(var i=0; i<this.state.data.games.length; i++){
            if(this.state.data.games[i].name == game) {
                game = this.state.data.games[i];
                this.setState({game});
                console.log(game)
                break;
            }
        }
        const data = {
            game: game.id,
            top: this.state.top
        };
        this.selectPlayers(data);        
    }

    onTopSelectChange(e) {
        e.preventDefault();
        const top = e.target.value;
        this.setState({top});
        const data = {
            game: this.state.game.id,
            top: top,
        }
        this.selectPlayers(data);
    }

    onPlayerSelectChange(e) {
        e.preventDefault();
        var player = e.target.value;
        for(var i = 0; i< this.state.data.players.length; i ++) {
            if(player == this.state.data.players[i].name){
                player = this.state.data.players[i];
                console.log(player);
                this.state.player = player;
            }
        }
        const data = {
            game: this.state.game.id,
            player: player.id,
        }
        this.selectJudges(data);
    }

    selectPlayers(data) {
        console.log('sendData',data);
        axios
        .post(Constants.APP_URL+'/api/home', data)
        .then((response)=> {
            if(response.data.status === 200) {
                console.log(response.data);
                this.setState({
                    data: response.data.data,
                    responseStatus: true,
                });
            } else {
                this.setState({
                    responseStatus: false,
                });
            }
        });
    }

    selectJudges(data) {
        console.log('sendData', data);
        axios
        .post(Constants.APP_URL+"/api/judge", data)
        .then((response) => {
            if(response.data.status === 200) {
                console.log(response.data);
                this.state.data.judges = response.data.data.judges,
                this.setState({responseStatus: true});
            } else {
                this.setState({
                    responseStatus: false,
                });
            }
        });
    }
        
    render() {
        const responseStatus = this.state.responseStatus;
        return (
            <div>
                <div className="row">
                    <div className="container">
                        <Row form>
                            <Col md={4} sm={5} xs={5}>
                                <FormGroup>
                                    <Label for="game">Select game</Label>
                                    <Input type="select" onChange={(e) => this.onGameSelectChange(e)} name="game" id="game_select">
                                        {this.state.data.games.map((game, index) => (
                                            <option key={index}>{game.name}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4} sm={2} xs={2}>
                                <FormGroup>
                                    <Label for="game">Top</Label>
                                    <Input type="select" onChange={(e) => this.onTopSelectChange(e)} name="top">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="1000">1000</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4} sm={5} xs={5}>
                                <br />
                                <a href='https://c7s3-4m-syd.hosting-services.net.au:2083/' className="btn btn-link" style={{marginTop:8}}>Click here to link</a>
                            </Col>
                        </Row>
                        <h5>YoYo.Ninja leader board</h5>
                        <div className="container" style={{maxHeight:550, overflowY:'auto', border:"1px solid gray"}}>
                            <Table striped responsive>
                                <thead>
                                    <tr>
                                        <th>RANK</th>
                                        <th>NAME</th>
                                        <th>SCORE</th>
                                    </tr>
                                </thead>
                                <tbody> 
                                    {
                                        !responseStatus ? (
                                            <span>No player found!</span>
                                        ) : (
                                            this.state.data.players.map((player, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{player.name}</td>
                                                    <td>{player.vote}</td>
                                                </tr>
                                            // {/* {console.log("state",this.state.data.players)} */}
                                            ))
                                        )
                                    }
                                </tbody>
                            </Table>                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="container" style={{marginTop:30}}>
                        <Row form>
                            <Col md={4} sm={7} xs={7}>
                                <FormGroup>
                                    <Label>Players scoreboard</Label>
                                    <Input type="select" onChange={(e) => this.onPlayerSelectChange(e)} name="player">
                                        {!responseStatus?(
                                            <p>No player!</p>
                                        ) : (
                                            this.state.data.players.map((player, index) => (
                                                <option key={index}>{player.name}</option>
                                            ))
                                        )}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4} sm={5} xs={5}>
                                <br/>
                                <a href='https://c7s3-4m-syd.hosting-services.net.au:2083/' className="btn btn-link" style={{marginTop:8}}>Click here to link</a>
                            </Col>
                        </Row>
                        <h5>Score Board : {this.state.player.name}</h5>
                        <div className="container">
                            <Table striped responsive>
                                <thead>
                                    <tr>
                                        {this.state.data.judges.map((judge, index) => (
                                            <th key={index}>{judge.name}</th>
                                        ))}
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {this.state.data.judges.map((judge, index) => (
                                            <td key={index}>-{judge.vote_minus} | +{judge.vote_plus}</td>
                                        ))}
                                        <td>{this.state.player.vote}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dash;