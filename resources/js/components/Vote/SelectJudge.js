import React, { Component } from "react";
import {Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
import $ from 'jquery';

export default class SelectJudge extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedGame : [],
            selectedPlayer: [],
            selectedJudge: [],
        }
    }

    componentDidMount() {
        // initialize the state with props data
        this.setState({
            selectedGame : this.props.selectedGame,
            selectedPlayer: this.props.selectedPlayer,
            selectedJudge: this.props.selectedJudge,
        });
        console.log('state', this.state);
    }

    //when user selects the player
    onGameSelect(e) {
        const selectedGame = e.target.value;
        this.setState({selectedGame});
    }

    //when user selects the player
    onPlayerSelect(e) {
        const selectedPlayer = e.target.value;
        this.setState({selectedPlayer});
    }

    //when user selects the judge
    onJudgeSelect(e) {
        const selectedJudge = e.target.value;
        this.setState({selectedJudge});
    }

    //when user clickes the create button
    onCreateClick() {
        console.log('select', this.state.selectedGame);
        if(!this.state.selectedGame) this.state.selectedGame = this.props.selectedGame.name;
        if(!this.state.selectedPlayer) this.state.selectedPlayer = this.props.selectedPlayer.name;
        if(!this.state.selectedJudge) this.state.selectedJudge = this.props.selectedJudge.name;
        this.props.handleCreate(
            this.state.selectedGame,
            this.state.selectedPlayer,
            this.state.selectedJudge);
    }

    render() {
        return (
            <div className="container">
                <Row form>
                    <Col md={3} sm={12}>
                        <FormGroup>
                            <Label for="game">Select game</Label>
                            <Input type="select" name="game" id="gameSelect" 
                                onChange={(e) => this.onGameSelect(e)}
                            >
                                {this.props.games.map((game, index) => (
                                    <option key={index}>{game.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3} sm={12}>
                        <FormGroup>
                            <Label for="player">Select player</Label>
                            <Input type="select" name="player" id="playerSelect" 
                                onChange={(e) => this.onPlayerSelect(e)}
                                ref = {this.playerRef}
                            >
                                {this.props.players.map((player, index) => (
                                    <option key={index}>{player.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3} sm={12}>
                        <FormGroup>
                            <Label for="judge">Select judge</Label>
                            <Input type="select" name="judge" id="judgeSelect"
                                onChange={(e) => this.onJudgeSelect(e)}
                                ref = {this.judgeRef}
                            >
                                {this.props.judges.map((judge, index) => (
                                    <option key={index}>{judge.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3} sm={12}>
                        <br/>
                        <Button
                            style = {{marginTop:9, width:'100%'}}
                            color = 'primary'
                            onClick = {() => this.onCreateClick()}
                        >
                            Create
                        </Button>
                    </Col>
                </Row>
                <div className="alert"></div>
            </div>
        );
    }
}