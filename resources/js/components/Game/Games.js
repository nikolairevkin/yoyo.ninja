import React, { Component } from 'react';
import axios from 'axios';

import {Input, Table, Button, FormGroup, Form} from 'reactstrap';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal';
import EditModal from './EditModal';
import Constants from './../Constants';
import $ from 'jquery';

export default class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            msg: '',
            games : [],
            checkedGames: [],
            blank: ''
        };
    };

    componentDidMount() {
        axios
        .get(Constants.APP_URL+'/api/games')
        .then((response) => {
            this.setState({isLoading: false});
            if(response.data.status === 200) {
                this.setState({
                    msg: response.data.message,
                    games: response.data.data,
                });
            }
        });
    }

    handleCheck(e) {
        const target= e.target;
        var id = target.value;
        var checkedGame = '';
        console.log(id);

        for(var i = 0; i < this.state.games.length ; i++) {
            if(this.state.games[i].id === parseInt(id)) {
                console.log(this.state.games[i].id);
                checkedGame = this.state.games[i];
            }
        }

        var checkedGames = this.state.checkedGames;
        if(!checkedGames.includes(checkedGame)){
            checkedGames.push(checkedGame);
        } else {
            const position = checkedGames.indexOf(checkedGame);
            checkedGames.splice(position, 1);
        }
        console.log(checkedGames);
        this.setState({checkedGames});
    }

    handleDelete() {
        var checkedGames = this.state.checkedGames;
        checkedGames.forEach(game => {
            axios
            .delete(Constants.APP_URL+'/api/game/' + game.id)
            .then((response)=>{
                this.setState({isLoading: false});
                this.state.msg = response.data.message;
                if(!response.data.success) {
                    return false;
                } else {
                    this.setState({games: response.data.data});
                    return true;
                }
            });        
        });
        checkedGames = [];
        this.setState({checkedGames});
        console.log(this.state.checkedGames);
        $("input[type=checkbox]").prop('checked', false);
    }

    handleEdit(name) {
        const data = {name: name};
        const game = this.state.checkedGames[0].id;
        axios
        .post(Constants.APP_URL+'/api/game/'+game, data)
        .then((response) => {
            this.setState({isLoading: false});
            if(response.data.success === true) {
                const games = response.data.data;
                this.setState({games});
            }else {
                this.setState({msg: response.data.message});
                $("div.alert").html("This name already exists!");
                $("div.alert").fadeIn('500').delay('2000').fadeOut('500');
            }
        });
        $("input[type=checkbox]").prop('checked', false);
    }

    handleAdd(name) {
        const game = {name: name};
        console.log(game);
        axios
        .post(Constants.APP_URL+'/api/game', game)
        .then((response) => {
            this.setState({isLoading: false});
            console.log(response.data.success);
            if(response.data.success === true) {
                const games = response.data.data;
                this.setState({games});
            } else {
                this.setState({mas: response.data.message});
                $("div.alert").html("This name already exists!");
                $("div.alert").fadeIn('500').delay('2000').fadeOut('500');
            }
        });
    }


    render() {
        this.state.btnStyle = {
            display: 'inline-block',
            float: 'right',
            padding: 5,
        };
      
        const isLoading = this.state.isLoading;
        return (
            <div className="container" style={{marginTop:50}}>
                <div className="row">
                    <h1>Games</h1>
                </div>
                <div className="row">
                    <div className="container">
                        <AddModal
                            buttonLabel = 'Add New'
                            btnStyle = {this.state.btnStyle}
                            handleAdd = {(name) => this.handleAdd(name)}
                        />
                        {' '}
                        <EditModal
                            buttonLabel = 'Edit'
                            btnStyle = {this.state.btnStyle}
                            handleEdit = {(name) => this.handleEdit(name)}
                            checked = {this.state.checkedGames}
                        />
                        {' '}
                        <DeleteModal
                            buttonLabel = "Delete"
                            btnStyle = {this.state.btnStyle}
                            handleDelete = {() => this.handleDelete()}
                            checked = {this.state.checkedGames}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="container" style={{marginTop:50, maxHeight:550, overflow:'auto', border:'1px solid lightgray'}}>
                        <Form id='table-form'>
                        <Table hover striped className="center-table">
                            <thead>
                                <tr>
                                    <th>  </th>
                                    <th>No</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <th rowSpan='3'>
                                            <span
                                                className="spinner-border spinner-border-sm ml-5"
                                                role="status"
                                                aria-hidden="true"    
                                            >
                                            </span>
                                        </th>
                                    </tr>
                                ) : (this.state.games.map((game, index) => (
                                    <tr key={index}>
                                        <th scope='row'>
                                            <FormGroup check>
                                                <Input name='games' id={index}
                                                    type='checkbox' value={game.id}
                                                    onChange={e => this.handleCheck(e)}
                                                />
                                            </FormGroup></th>
                                        <td>{ index + 1}</td>
                                        <td>{game.name}</td>
                                    </tr>
                                )))}
                            </tbody>
                        </Table>
                        </Form>
                    </div>
                </div>
                <div className="alert"></div>
            </div>
        );
    }
}