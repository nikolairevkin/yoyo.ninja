import React, { Component } from 'react';
import axios from 'axios';

import {Input, Table, Button, FormGroup, Form} from 'reactstrap';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal';
import EditModal from './EditModal';
import Constants from './../Constants';
import $ from 'jquery';

export default class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            msg: '',
            players : [],
            checkedPlayers: [],
            blank: ''
        };
    };

    componentDidMount() {
        axios
        .get(Constants.APP_URL+'/api/players')
        .then((response) => {
            this.setState({isLoading: false});
            if(response.data.status === 200) {
                this.setState({
                    msg: response.data.message,
                    players: response.data.data,
                });
            }
        });
    }

    handleCheck(e) {
        const target= e.target;
        var id = target.value;
        var checkedPlayer = '';
        console.log(id);

        for(var i = 0; i < this.state.players.length ; i++) {
            if(this.state.players[i].id === parseInt(id)) {
                console.log(this.state.players[i].id);
                checkedPlayer = this.state.players[i];
            }
        }

        var checkedPlayers = this.state.checkedPlayers;
        if(!checkedPlayers.includes(checkedPlayer)){
            checkedPlayers.push(checkedPlayer);
        } else {
            const position = checkedPlayers.indexOf(checkedPlayer);
            checkedPlayers.splice(position, 1);
        }
        console.log(checkedPlayers);
        this.setState({checkedPlayers});
    }

    handleDelete() {
        var checkedPlayers = this.state.checkedPlayers;
        checkedPlayers.forEach(player => {
            axios
            .delete(Constants.APP_URL+'/api/player/' + player.id)
            .then((response)=>{
                this.setState({isLoading: false});
                this.state.msg = response.data.message;
                if(!response.data.success) {
                    return false;
                } else {
                    this.setState({players: response.data.data});
                    return true;
                }
            });        
        });
        checkedPlayers = [];
        this.setState({checkedPlayers});
        console.log(this.state.checkedPlayers);
        $("input[type=checkbox]").prop('checked', false);
    }

    handleEdit(name) {
        const data = {name: name};
        const player = this.state.checkedPlayers[0].id;
        axios
        .post(Constants.APP_URL+'/api/player/'+player, data)
        .then((response) => {
            this.setState({isLoading: false});
            if(response.data.success === true) {
                const players = response.data.data;
                this.setState({players});
            }else {
                this.setState({msg: response.data.message});
                $("div.alert").html("This name already exists!");
                $("div.alert").fadeIn('500').delay('2000').fadeOut('500');
            }
        });
        $("input[type=checkbox]").prop('checked', false);
    }

    handleAdd(name) {
        const player = {name: name};
        console.log(player);
        axios
        .post(Constants.APP_URL+'/api/player', player)
        .then((response) => {
            this.setState({isLoading: false});
            console.log(response.data.success);
            if(response.data.success === true) {
                const players = response.data.data;
                this.setState({players});
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
                    <h1>Players</h1>
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
                            checked = {this.state.checkedPlayers}
                        />
                        {' '}
                        <DeleteModal
                            buttonLabel = "Delete"
                            btnStyle = {this.state.btnStyle}
                            handleDelete = {() => this.handleDelete()}
                            checked = {this.state.checkedPlayers}
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
                                ) : (this.state.players.map((player, index) => (
                                    <tr key={index}>
                                        <th scope='row'>
                                            <FormGroup check>
                                                <Input name='players' id={index}
                                                    type='checkbox' value={player.id}
                                                    onChange={e => this.handleCheck(e)}
                                                />
                                            </FormGroup></th>
                                        <td>{ index + 1}</td>
                                        <td>{player.name}</td>
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