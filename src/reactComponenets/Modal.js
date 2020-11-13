import React, { Component } from "react";
import {Modal, Button, FormGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalEditTask extends Component {
    constructor(props) {
        super(props);

        this.state={
            value: this.props.data.text
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }



    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup>
                            <Form.Label>
                                Task:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                                onClick={() => this.props.onClick()}>Close</Button>
                        <Button variant="primary"
                                onClick={() => this.props.onSave({task: {id: this.props.data.id, text: this.state.value}})}>Submit</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default ModalEditTask;