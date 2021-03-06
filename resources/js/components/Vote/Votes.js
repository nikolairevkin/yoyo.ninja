import React, { Component } from "react";
import axios from 'axios';
import SelectJudge from './SelectJudge';
import VotePanel from './VotePanel';
import Constants from './../Constants';
import $ from 'jquery';

export default class Votes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                games: [],
                players: [],
                judges: [],
                selectedGame: '',
                selectedPlayer: '',
                selectedJudge: '',
            },
            vote_plus: 0,
            vote_minus: 0,
            tableData: {
                judges: [],
                votes_plus: [],
                votes_minus: [],
                game: '',
                player: '',
                judge: '',
            },
            isSelected: false,
        }
    }

    componentDidMount() {
        this.mounted = true;
        axios
            .get(Constants.APP_URL+'/api/votes')
            .then((response) => {
                if (this.mounted) {
                    console.log(response.data.data);
                    if (response.data.status === 200) {
                        this.setState({ data: response.data.data });
                    }
                }
            });
        console.log(this.state)
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleCreate(game, player, judge) {
        
        var judges = this.state.tableData.judges;
        var votes_plus = this.state.tableData.votes_plus;
        var votes_minus = this.state.tableData.votes_minus;
        if (judges.includes(judge)) {
            $("div.alert").html('Select another judge!');
            $('div.alert').fadeIn('500').delay('3000').fadeOut('500');
        } else {
            judges.push(judge);
            votes_plus.push(0);
            votes_minus.push(0);
        }

        var tableData = {
            judges: judges,
            votes_plus: votes_plus,
            votes_minus: votes_minus,
            game: game,
            player: player,
            judge: judge,
        };
        this.setState({
            tableData: tableData,
            vote_plus: 0,
            vote_minus: 0,
            isSelected: true,
        });
        console.log(tableData);
    }

    handleKeyUp(e) {
        if (this.state.isSelected) {
            var c = String.fromCharCode(e.which);
            if (c === 'P' || c === '+') {
                var vote_plus = this.state.vote_plus + 1;
                var votes = this.state.tableData.votes_plus;
                votes[votes.length - 1] = vote_plus;
                this.state.tableData.votes_plus = votes;
                this.setState({ vote_plus });
            }
            if (c === 'N' || c == '-') {
                var vote_minus = this.state.vote_minus + 1;
                var votes = this.state.tableData.votes_minus;
                votes[votes.length - 1] = vote_minus;
                this.state.tableData.votes_minus = votes;
                this.setState({ vote_minus });
            }
            if(c == 'N' || c == 'P' || c == '+' || c == '-') {
                const data = {
                    game: this.state.tableData.game,
                    player: this.state.tableData.player,
                    judge: this.state.tableData.judge,
                    vote_plus: this.state.tableData.votes_plus[this.state.tableData.votes_plus.length-1],
                    vote_minus: this.state.tableData.votes_minus[this.state.tableData.votes_minus.length-1],
                };
                console.log(data);
                axios
                .post(Constants.APP_URL+'/api/save', data)
                .then((response) => {
                    if(response.status === 200){
                        $.ajax({
                            type:'POST',
                            url: '/',
                            data: {changed: true}
                        });
                    }
                });
            }
            console.log(c);
        }
    }

    handleResetClick() {
        var votes = this.state.tableData.votes_plus;
        votes[votes.length - 1] = 0;
        this.state.tableData.votes_plus = votes;
        var votes = this.state.tableData.votes_minus;
        votes[votes.length - 1] = 0;
        this.state.tableData.votes_minus = votes;
        var tableData = {
            judges: [],
            votes_plus: [],
            votes_minus: [],
            game: '',
            player: '',
            judge: '',
        }
        this.setState({
            tableData: tableData,
            vote_minus: 0,
            vote_plus: 0,
        });
    }

    render() {
        return ( 
            <div style = {{ marginTop: 50 }} tabIndex = "0" onKeyUp = {(e) => this.handleKeyUp(e) } >
                <div className = "row" >
                    <h1> Votes </h1> 
                </div>
                <div className = "row" >
                    <SelectJudge 
                        games = { this.state.data.games }
                        players = { this.state.data.players }
                        judges = { this.state.data.judges }
                        handleCreate = { (game, player, judge) => this.handleCreate(game, player, judge) }
                        selectedGame = { this.state.data.selectedGame }
                        selectedPlayer = { this.state.data.selectedPlayer }
                        selectedJudge = { this.state.data.selectedJudge }
                    />
                </div>
                <div className = "row" >
                    <VotePanel
                        data = { this.state.tableData }
                        vote_plus = { this.state.vote_plus }
                        vote_minus = { this.state.vote_minus }
                        onResetClick = { () => this.handleResetClick() }
                    /> 
                </div>
                <div className="alert"></div>
            </div>
        );
    }
}