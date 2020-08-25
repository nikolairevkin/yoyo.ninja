import React, { Component } from 'react';
import axios from 'axios';

import {Input, Table, Button, FormGroup, Form} from 'reactstrap';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';

export default class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            msg: '',
            players : [],
            checked: [],
        };
    };

    componentDidMount() {
        axios
        .get('http://localhost:8000/api/players')
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

    componentDidUpdate() {
        this.state.checked = [];
        this.state.isLoading = false;
    }

    handleCheck(e) {
        const target= e.target;
        var value = target.value;
        var id = target.id;

        if(target.checked){
            this.state.checked[id] = value;
        } else {
            delete this.state.checked[id];
        }
    }

    handleDelete() {
        const players = this.state.players;
        
        this.state.checked.every((player) => {
            if(player) {
                axios
                .delete('http://localhost:8000/api/player/' + player)
                .then((response)=>{
                    this.setState({isLoading: true});
                    this.state.msg = response.data.message;
                    if(!response.data.success) {
                        return false;
                    } else {
                        this.setState({players: response.data.data});
                        return true;
                    }
                });
            }
        });
    }

    handleAdd(name) {
        const player = {name: name};
        axios
        .post('http://localhost:8000/api/player', player)
        .then((response) => {
            this.setState({isLoading: true});
            if(response.data.success === true) {
                const players = response.data.data;
                this.setState({players});
            }else {
                this.setState({msg: response.data.message});
                alert('Player with this name already exists!');
            }
        });
    }

    render() {
        this.state.btnStyle = {
            display: 'inline-block',
            float: 'right',
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
                        <DeleteModal
                            buttonLabel = "Delete"
                            btnStyle = {this.state.btnStyle}
                            handleDelete = {() => this.handleDelete()}
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
            </div>
        );
    }
}