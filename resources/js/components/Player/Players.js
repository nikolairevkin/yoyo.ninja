import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Input, Table, Button, FormGroup} from 'reactstrap';

export default class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            msg: '',
            players : [],
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

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
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
                                <td rowSpan='3'>
                                    <span
                                        className="spinner-border spinner-border-sm ml-5"
                                        role="status"
                                        aria-hidden="true"    
                                    >
                                    </span>
                                </td>
                            </tr>
                        ) : (this.state.players.map((player, index) => (
                            <tr key={index}>
                                <th scope='row'><FormGroup check><Input type='checkbox'/></FormGroup></th>
                                <td>{ index + 1}</td>
                                <td>{player.name}</td>
                            </tr>
                        )))}
                    </tbody>
                </Table>
                <Button>Add New</Button>
                <Button>Delete</Button>
            </div>
        );
    }
}