import React, { Component } from 'react';
import axios from 'axios';

import {Input, Table, Button, FormGroup, Form} from 'reactstrap';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal';
import EditModal from './EditModal';
import Constants from './../Constants';
import $ from 'jquery';

export default class judges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            msg: '',
            judges : [],
            checkedJudges: [],
            blank: ''
        };
    };

    componentDidMount() {
        axios
        .get(Constants.APP_URL+'/api/judges')
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

    handleCheck(e) {
        const target= e.target;
        var id = target.value;
        var checkedJudge = '';
        console.log(id);

        for(var i = 0; i < this.state.judges.length ; i++) {
            if(this.state.judges[i].id === parseInt(id)) {
                console.log(this.state.judges[i].id);
                checkedJudge = this.state.judges[i];
            }
        }

        var checkedJudges = this.state.checkedJudges;
        if(!checkedJudges.includes(checkedJudge)){
            checkedJudges.push(checkedJudge);
        } else {
            const position = checkedJudges.indexOf(checkedJudge);
            checkedJudges.splice(position, 1);
        }
        console.log(checkedJudges);
        this.setState({checkedJudges});
    }

    handleDelete() {
        var checkedJudges = this.state.checkedJudges;
        checkedJudges.forEach(judge => {
            axios
            .delete(Constants.APP_URL+'/api/judge/' + judge.id)
            .then((response)=>{
                this.setState({isLoading: false});
                this.state.msg = response.data.message;
                if(!response.data.success) {
                    return false;
                } else {
                    this.setState({judges: response.data.data});
                    return true;
                }
            });        
        });
        checkedjudges = [];
        this.setState({checkedjudges});
        console.log(this.state.checkedjudges);
        $("input[type=checkbox]").prop('checked', false);
    }

    handleEdit(name) {
        const data = {name: name};
        const judge = this.state.checkedjudges[0].id;
        axios
        .post(Constants.APP_URL+'/api/judge/'+judge, data)
        .then((response) => {
            this.setState({isLoading: false});
            if(response.data.success === true) {
                const judges = response.data.data;
                this.setState({judges});
            }else {
                this.setState({msg: response.data.message});
                $("div.alert").html("This name already exists!");
                $("div.alert").fadeIn('500').delay('2000').fadeOut('500');
            }
        });
        $("input[type=checkbox]").prop('checked', false);
    }

    handleAdd(name) {
        const judge = {name: name};
        console.log(judge);
        axios
        .post(Constants.APP_URL+'/api/judge', judge)
        .then((response) => {
            this.setState({isLoading: false});
            console.log(response.data.success);
            if(response.data.success === true) {
                const judges = response.data.data;
                this.setState({judges});
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
                        <EditModal
                            buttonLabel = 'Edit'
                            btnStyle = {this.state.btnStyle}
                            handleEdit = {(name) => this.handleEdit(name)}
                            checked = {this.state.checkedjudges}
                        />
                        {' '}
                        <DeleteModal
                            buttonLabel = "Delete"
                            btnStyle = {this.state.btnStyle}
                            handleDelete = {() => this.handleDelete()}
                            checked = {this.state.checkedjudges}
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
                <div className="alert"></div>
            </div>
        );
    }
}