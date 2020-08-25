import React, { Component } from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, Table, CardFooter, Col, Button} from 'reactstrap';

export default class VotePanel extends Component {

    // create Judge`s name row
    renderJudgeRow() {
        return this.props.data.judges.map((judge, index) => {
            return (
                <th key={index}><div style={{cursor:"pointer"}}>{judge}</div>
                </th>
            );
        });
    }

    // create vote row
    renderVoteRow() {
        return this.props.data.votes_plus.map((vote_plus, index) => {
            return (
                <td key={index}>-{this.props.data.votes_minus[index]}|+{vote_plus}</td>
            );
        });
    }

    // calculate the total vote
    renderTotalVote() {
        var total = 0;
        this.props.data.votes_minus.map((vote_minus, index) => {
            total = total - vote_minus + this.props.data.votes_plus[index];
        });
        return total;
    }

    // when user clicks the reset button
    onResetClick(e) {
        e.preventDefault();
        this.props.onResetClick();
    }

    render() {
        const divStyle = {
            width: '80%',
            margin: 'auto',
        }
     
        const selectedJudge = (this.props.data.judge === '')?"No judge created":this.props.data.judge;
        const selectedPlayer = (this.props.data.player === '')?"No player created":this.props.data.player;
        return(
            <div className="container">
                <Card>
                    <CardBody>
                        <CardTitle  style={{textAlign:'center'}}> <strong>Judge : </strong> &nbsp;&nbsp;{selectedJudge}</CardTitle>
                        <CardSubtitle>
                            <div className="voteContainer" style={divStyle}>
                                <div className="row">
                                    <Col md={4} sm={4}><h1 style={{textAlign:'center', fontSize:50}}>-{this.props.vote_minus}</h1></Col>
                                    <Col md={4} sm={4}><Button size="lg" color="success" style={{width:'100%', marginTop:7}} onClick={(e) => this.onResetClick(e)}>RESET</Button></Col>
                                    <Col md={4} sm={4}><h1 style={{textAlign:'center', fontSize:50}}>+{this.props.vote_plus}</h1></Col>
                                </div>
                            </div>
                        </CardSubtitle>
                        <CardFooter>
                            <div className="row" className="voteTable">
                                <strong style={{marginBottom:10}}>Score Board : </strong> &nbsp;&nbsp;{selectedPlayer}
                                <Table bordered striped responsive>
                                    <thead>
                                        <tr>
                                            {this.renderJudgeRow()}
                                            <th><div>Total</div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {this.renderVoteRow()}
                                            <td>{this.renderTotalVote()}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardFooter>
                    </CardBody>
                </Card>
            </div>
        )
    }
}