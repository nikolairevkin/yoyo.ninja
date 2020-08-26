import React, { Component } from 'react';
import axios from 'axios';

import {Input, Table, FormGroup, Form} from 'reactstrap';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';

export default class Judges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            msg: '',
            judges : [],
            checked: [],
        };
    };

    componentDidMount() {
        axios
        .get('http://yoyo.ninja/api/judges')
        .then((response) => {
            this.setState({isLoading: false});
            if(response.data.status === 200) {
                this.setState({
                    msg: response.data.message,
                    judges: response.data.data,
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
        console.log(this.state.checked);
    }

    handleDelete() {
        console.log(this.state.checked);
        const judges = this.state.judges;
        
        this.state.checked.every((judge) => {
            console.log(judge);
            if(judge) {
                console.log(judge);
                axios
                .delete('http://yoyo.ninja/api/judge/' + judge)
                .then((response)=>{
                    console.log(judge);
                    this.setState({isLoading: true});
                    this.state.msg = response.data.message;
                    if(!response.data.success) {
                        return false;
                    } else {
                        console.log(response.data.data)
                        this.setState({judges: response.data.data});
                        return true;
                    }
                });
            }
        });
        console.log(this.state.msg);
    }

    handleAdd(name) {
        const judge = {name: name};
        console.log(judge);
        axios
        .post('http://yoyo.ninja/api/judge', judge)
        .then((response) => {
            this.setState({isLoading: true});
            console.log(response.data.success);
            if(response.data.success === true) {
                const judges = response.data.data;
                this.setState({judges});
            } else {
                this.setState({mas: response.data.message});
                alert('Judge with this name already exists!');
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
                    <h1>Judges</h1>
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
                                ) : (this.state.judges.map((judge, index) => (
                                    <tr key={index}>
                                        <th scope='row'>
                                            <FormGroup check>
                                                <Input name='judges' id={index} 
                                                    type='checkbox' value={judge.id} 
                                                    onChange={e => this.handleCheck(e)}
                                                />
                                            </FormGroup></th>
                                        <td>{ index + 1}</td>
                                        <td>{judge.name}</td>
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