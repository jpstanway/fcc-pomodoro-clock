import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col } from 'reactstrap';

class Controls extends Component {
    render() {
        return(
            <Row id="controls">
                <Col xs="4">
                    <div className="control-grp">
                        <h3 id="session-label">Session Length</h3>
                        <p id="session-length">25</p>
                        <ButtonGroup>
                            <Button id="session-decrement"><i className="far fa-minus-square"></i></Button>
                            <Button id="session-increment"><i className="far fa-plus-square"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>  
                <Col xs="4">
                    <div className="control-grp">
                        <ButtonGroup>
                            <Button id="start-stop"><i className="far fa-play-circle"></i><i className="far fa-pause-circle"></i></Button>
                            <Button id="reset"><i className="fas fa-redo-alt"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>  
                <Col xs="4">
                    <div className="control-grp">
                        <h3 id="break-label">Break Length</h3>
                        <p id="break-length">5</p>
                        <ButtonGroup>
                            <Button id="break-decrement"><i className="far fa-minus-square"></i></Button>
                            <Button id="break-increment"><i className="far fa-plus-square"></i></Button>
                        </ButtonGroup>
                    </div>
                </Col>      
            </Row>
        );
    }
}

export default Controls;